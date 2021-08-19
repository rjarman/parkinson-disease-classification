from libs.InceptionV3 import InceptionV3
from libs.DenseNet121 import DenseNet121
import torch
import torchvision
import numpy as np
import matplotlib.pyplot as plt
from datetime import datetime
import os
import torchvision.transforms as transforms
import cv2
import json
import pickle
from shutil import rmtree
import base64

import warnings
warnings.filterwarnings('ignore')


class ContextManager:
    def __init__(self) -> None:
        if torch.cuda.is_available():
            print(f'{torch.cuda.device_count()} GPU is available with CUDA enabled and current device is number {torch.cuda.current_device()} which has a model {torch.cuda.get_device_name()}')
            self.device = torch.device('cuda:0')
        else:
            self.device = torch.device('cpu')
        # comment this if you have large enough GPU
        self.device = torch.device('cpu')
        self.__pipeline()

    def __pipeline(self):
        self.densenet121 = DenseNet121()
        self.densenet121 = self.densenet121.to(self.device)
        self.densenet121.eval()

        self.inceptionV3 = InceptionV3()
        self.inceptionV3 = self.inceptionV3.to(self.device)
        self.inceptionV3.eval()
        with open('data/pickles/densenet121_wave.pkl', 'rb') as file:
            self.wave_clf = pickle.load(file)
        with open('data/pickles/inception_v3_spiral.pkl', 'rb') as file:
            self.spiral_clf = pickle.load(file)

    def __cls_decode(self, data):
        enc = {0: 'Healthy', 1: 'Parkinson'}
        return enc[data[0]]

    def __clear_tmp(self): rmtree('data/.tmp/')

    def __load_data(self, data_folder, batch_size):
        _mean = [0.4, 0.4, 0.4]
        _std = [0.4, 0.4, 0.4]

        transform = transforms.Compose(
            [
                transforms.Resize([self.IMG_HEIGHT, self.IMG_WIDTH]),
                transforms.ToTensor(),
                transforms.Normalize(mean=_mean, std=_std)
            ]
        )
        data = torchvision.datasets.ImageFolder(
            root=data_folder, transform=transform)

        print(f'Total mean to normalize for three channels: {_mean}',
              f'Total std to normalize for three channels: {_std}')
        data_loader = torch.utils.data.DataLoader(
            data, batch_size=batch_size, shuffle=True, num_workers=0)
        return data_loader

    def __feature_descriptor_gradcam(self, data_loader, img_type):
        print('Getting Features...')
        for index, data in enumerate(data_loader, 0):
            input_images, labels = data
            input_images, labels = input_images.to(
                self.device), labels.to(self.device)
            features = self.densenet121(
                input_images) if img_type == 'wave' else self.inceptionV3(input_images)
        print(f'Features shape: {features.shape}\n')

        print('Computing gradients...')
        features.backward(torch.ones_like(features))
        print('\n\n')

        # computing gradients
        gradients = self.densenet121.get_activations_gradient(
        ) if img_type == 'wave' else self.inceptionV3.get_activations_gradient()
        print(f'Gradients shape: {gradients.shape}\n\n')

        print('Computing activations...')
        # get the activations of the last convolutional layer
        activations = self.densenet121.get_activations(input_images).detach(
        ) if img_type == 'wave' else self.inceptionV3.get_activations(input_images).detach()
        print(f'Activations shape: {activations.shape}\n\n')

        return (gradients, activations, features, labels)

    def __gen_heatmap_gridcam(self, _data, _gradient, _activations):
        def _(gradients, activations, original_img):
            heatmap = self.__gen_heat_map(gradients, activations)
            _gridcam_org_combine = self.__combine_heat_org_img(
                heatmap, original_img)
            return (heatmap, _gridcam_org_combine)

        print('Grad-Cam on train data')
        for val in _data:
            heatmap, gridcam_org_combine = _(
                _gradient, _activations, val[0][0])
            self.__show_grad_cam_grid(
                val[0][0], heatmap, gridcam_org_combine, val[1], 'train')

    # Grad-Cam section
    def __gen_heat_map(self, gradients, activations):
        means_of_gradients = torch.mean(gradients, dim=[0, 2, 3])

        # weight the channels by corresponding gradients
        for i in range(activations.shape[1]):
            activations[:, i, :, :] *= means_of_gradients[i]

        # average the channels of the activations
        heatmap = torch.mean(activations, dim=1).squeeze()
        heatmap = np.maximum(heatmap, 0)

        # normalize the heatmap
        heatmap /= torch.max(heatmap)

        return heatmap

    def __combine_heat_org_img(self, heatmap, original_img):
        heatmap = heatmap.permute(1, 0)[:, :]
        heatmap = heatmap.numpy()

        heatmap = cv2.resize(
            heatmap, (original_img.shape[1], original_img.shape[2]))

        heatmap = np.uint8(255 * heatmap)
        heatmap = cv2.applyColorMap(heatmap, cv2.COLORMAP_JET)

        original_img = original_img.permute(2, 1, 0)[:, :, :].numpy()
        original_img = np.uint8(255 * original_img)

        combined_img = heatmap * 0.5 + original_img
        return combined_img

    def __show_grad_cam_grid(self, original_img, heatmap_img, gradcam_img, imgs_title, sample_title):
        fld_p = 'data/.tmp/2/'
        if not os.path.exists(fld_p):
            os.makedirs(fld_p)
        plt.imshow(original_img.numpy().transpose((1, 2, 0)))
        # plt.title('sample', fontdict={'fontsize': 10})
        plt.axis('off')
        plt.tight_layout()
        plt.savefig(fld_p + 'original.png',
                    bbox_inches='tight', dpi=300)
        # plt.show()

        plt.imshow(cv2.rotate(cv2.flip(np.uint8(gradcam_img), 1),
                   cv2.ROTATE_90_COUNTERCLOCKWISE))
        # plt.title('sample', fontdict={'fontsize': 10})
        plt.axis('off')
        plt.tight_layout()
        plt.savefig(fld_p + 'gradcam.png',
                    bbox_inches='tight', dpi=300)
        # plt.show()

        plt.matshow(heatmap_img.permute(1, 0)[:, :].numpy(), fignum=0)
        # plt.title('sample', fontdict={'fontsize': 10})
        plt.axis('off')
        plt.tight_layout()
        plt.savefig(fld_p + 'heatmap.png',
                    bbox_inches='tight', dpi=300)
        # plt.show()

    def __base64_convert(self):
        _tmp_imgs = ['data/.tmp/2/original.png',
                     'data/.tmp/2/gradcam.png', 'data/.tmp/2/heatmap.png']
        _tmp_64 = []
        for _img in _tmp_imgs:
            with open(_img, "rb") as image_file:
                _tmp = base64.b64encode(image_file.read()).decode("utf-8")
                _tmp = 'data:image/png;base64,' + _tmp
                _tmp_64.append(_tmp)
        return _tmp_64

    def set_img(self, img) -> None:
        self.filename = str(datetime.now().timestamp()).split('.')[0] + '.png'
        fld_p = 'data/.tmp/1/'
        self.image = img
        plt.axis('off')
        plt.tight_layout()
        plt.imshow(img)
        if not os.path.exists(fld_p):
            os.makedirs(fld_p)
        plt.savefig(fld_p + self.filename,
                    bbox_inches='tight', dpi=300)
        # plt.show()

    async def predict_image(self, websocket, img_type):
        self.IMG_HEIGHT = 300 if img_type == 'wave' else 200
        self.IMG_WIDTH = 300 if img_type == 'wave' else 200
        await websocket.send(
            json.dumps(
                {
                    'status': True,
                    'type': 'status',
                    'value': {
                        'tag': 'Starting process',
                        'value': 'True'
                    }
                },
                separators=(',', ':')
            )
        )
        _data = self.__load_data('data/.tmp', 1)
        _gradients, _activations, _features, _labels = self.__feature_descriptor_gradcam(
            _data, img_type)
        self.__gen_heatmap_gridcam(_data, _gradients, _activations)
        _base_64 = self.__base64_convert()
        _features = _features[0].detach().numpy().tolist()
        if img_type == 'wave':
            predicted_cls = self.__cls_decode(
                self.wave_clf.predict([_features]))
            print(predicted_cls)
        elif img_type == 'spiral':
            predicted_cls = self.__cls_decode(
                self.spiral_clf.predict([_features]))
            print(predicted_cls)

        await websocket.send(
            json.dumps(
                {
                    'status': True,
                    'type': 'status',
                    'value': {
                        'tag': 'Image Classification',
                        'value': 'True'
                    }
                },
                separators=(',', ':')
            )
        )

        await websocket.send(
            json.dumps(
                {
                    'status': True,
                    'type': 'ImageFile',
                    'value': _base_64
                },
                separators=(',', ':')
            )
        )
        _status = True if predicted_cls == 'Healthy' else False
        await websocket.send(
            json.dumps(
                {
                    'status': _status,
                    'type': 'results',
                    'value': {
                        'tag': 'Result',
                        'value': predicted_cls
                    }
                },
                separators=(',', ':')
            )
        )
        self.__clear_tmp()
