import torch
import torch.nn as nn
import torchvision


class InceptionV3(torch.nn.Module):
    def __init__(self):
        super(InceptionV3, self).__init__()

        self.inception_v3 = torchvision.models.inception_v3(pretrained=True)

        self.classifier = nn.Sequential(
            self.inception_v3.Conv2d_1a_3x3,
            self.inception_v3.Conv2d_2a_3x3,
            self.inception_v3.Conv2d_2b_3x3,
            self.inception_v3.maxpool1,
            self.inception_v3.Conv2d_3b_1x1,
            self.inception_v3.Conv2d_4a_3x3,
            self.inception_v3.maxpool2,
            self.inception_v3.Mixed_5b,
            self.inception_v3.Mixed_5c,
            self.inception_v3.Mixed_5d,
            self.inception_v3.Mixed_6a,
            self.inception_v3.Mixed_6b,
            self.inception_v3.Mixed_6c,
            self.inception_v3.Mixed_6d,
            self.inception_v3.Mixed_6e,
            self.inception_v3.Mixed_7a,
            self.inception_v3.Mixed_7b,
            self.inception_v3.Mixed_7c
        )
        self.avg_adaptive_pool = self.inception_v3.avgpool
        self.dropout_inc = self.inception_v3.dropout
        self.fully_connected = self.inception_v3.fc

        self.gradients = None

    def forward(self, x):
        x = self.classifier(x)

        h = x.register_hook(self.activations_hook)

        # Adaptive average pooling
        x = self.avg_adaptive_pool(x)
        # N x 2048 x 1 x 1
        x = self.dropout_inc(x)
        # N x 2048 x 1 x 1
        x = torch.flatten(x, 1)
        # N x 2048
        x = self.fully_connected(x)
        # N x 1000 (num_classes)
        return x

    def activations_hook(self, grad):
        self.gradients = grad

    def get_activations_gradient(self):
        return self.gradients

    def get_activations(self, x):
        return self.classifier(x)
