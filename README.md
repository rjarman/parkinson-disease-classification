# Parkinson Disease Classification

This is an implementation of early identification of Parkinson's disease from hand-drawn images with `inception_v3` and `densenet121` as feature descriptors and various classification algorithms to separate them as healthy or affected.

> Sample Images

- _Wave_ Dataset with **DenseNet121**

  - Original

    ![Original Wave Images(Train)](<notebooks/images/densenet121_wave/sample_of_original_img(train).png> 'Original Wave Images(Train)')
    ![Original Wave Images(Test)](<notebooks/images/densenet121_wave/sample_of_original_img(test).png> 'Original Wave Images(Test)')

  - Heatmap

    ![Heatmap Wave Images(Train)](<notebooks/images/densenet121_wave/sample_of_heatmap_img(train).png> 'Heatmap Wave Images(Train)')
    ![Heatmap Wave Images(Test)](<notebooks/images/densenet121_wave/sample_of_heatmap_img(test).png> 'Heatmap Wave Images(Test)')

  - Grad-Cam

    ![Heatmap Wave Images(Train)](<notebooks/images/densenet121_wave/sample_of_gradcam_img(train).png> 'Heatmap Wave Images(Train)')
    ![Heatmap Wave Images(Test)](<notebooks/images/densenet121_wave/sample_of_gradcam_img(test).png> 'Heatmap Wave Images(Test)')

- _Spiral_ Dataset **Inception V3**

  - Original

    ![Original Wave Images(Train)](<notebooks/images/inception_v3_spiral/sample_of_original_img(train).png> 'Original Spiral Images(Train)')
    ![Original Wave Images(Test)](<notebooks/images/inception_v3_spiral/sample_of_original_img(test).png> 'Original Spiral Images(Test)')

  - Heatmap

    ![Heatmap Wave Images(Train)](<notebooks/images/inception_v3_spiral/sample_of_heatmap_img(train).png> 'Heatmap Spiral Images(Train)')
    ![Heatmap Wave Images(Test)](<notebooks/images/inception_v3_spiral/sample_of_heatmap_img(test).png> 'Heatmap Spiral Images(Test)')

  - Grad-Cam

    ![Heatmap Wave Images(Train)](<notebooks/images/inception_v3_spiral/sample_of_gradcam_img(test).png> 'Heatmap Spiral Images(Train)')
    ![Heatmap Wave Images(Test)](<notebooks/images/inception_v3_spiral/sample_of_gradcam_img(test).png> 'Heatmap Spiral Images(Test)')

> Installation

- `git clone https://github.com/rjarman/parkinson-disease-classification.git`
- `cd parkinson-disease-classification/notebooks`
- `pip install -r requirements.txt`
  /media/rafsun/Working Drive/projects/parkinson-disease-classification/notebooks/images/densenet121_wave
