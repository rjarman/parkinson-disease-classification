
import torch
import torchvision
import torch.nn.functional as F


class DenseNet121(torch.nn.Module):
    def __init__(self):
        super(DenseNet121, self).__init__()

        self.densenet121 = torchvision.models.densenet121(pretrained=True)
        self.conv_layers = self.densenet121.features
        # self.conv_layers = self.densenet121.features[:-1]
        # self.batchpool2d = self.densenet121.features[-1]
        self.classifier_layers = self.densenet121.classifier
        self.gradients = None

    def forward(self, x):
        features = self.conv_layers(x)
        h = features.register_hook(self.activations_hook)
        # out = self.batchpool2d(features)
        out = F.relu(features, inplace=True)
        out = F.adaptive_avg_pool2d(out, (1, 1))
        out = torch.flatten(out, 1)
        out = self.classifier_layers(out)
        return out

    def activations_hook(self, grad):
        self.gradients = grad

    def get_activations_gradient(self):
        return self.gradients

    def get_activations(self, x):
        return self.conv_layers(x)
