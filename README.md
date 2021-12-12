# Parkinson Disease Classification

This is an implementation of early identification of Parkinson's disease from hand-drawn images with `inception_v3` and `densenet121` as feature descriptors and various classification algorithms to separate them as healthy or affected.

> To get the `.apk` click this [link](https://github.com/rjarman/parkinson-disease-classification/blob/master/Parkinson.apk).

> Application UI
- Front
  
  ![Initial front side of the app](app/sample_ss/front.png 'Initial front side of the app')
- Spiral __healthy__ test
  
  ![Spiral healthy test](app/sample_ss/spiral_healthy.png 'Spiral healthy test')
- Spiral __parkinson__ test
  
  ![Spiral parkinson test](app/sample_ss/spiral_parkinson.png 'Spiral parkinson test')
- Wave __healthy__ test
  
  ![Wave healthy test](app/sample_ss/wave_healthy.png 'Wave healthy test')
- Wave __parkinson__ test
  
  ![Wave parkinson test](app/sample_ss/wave_parkinson.png 'Wave parkinson test')

> Sample Images

- _Wave_ Dataset with **DenseNet121**

  - Original

    | ![(a) and (b) represents the train set sample, (c) and (d) are the test set sample of wave dataset](<notebooks/images/sample_train_test_wave.png> '(a) and (b) represents the train set sample, (c) and (d) are the test set sample of wave dataset') | 
    :-:
    |Fig: (a) and (b) represents the train set sample, (c) and (d) are the test set sample of wave dataset|

  - Heatmap

    ![Heatmap Wave Images(Train)](<notebooks/images/densenet121_wave/sample_of_heatmap_img(train).png> 'Heatmap Wave Images(Train)')
    ![Heatmap Wave Images(Test)](<notebooks/images/densenet121_wave/sample_of_heatmap_img(test).png> 'Heatmap Wave Images(Test)')

  - Grad-Cam

    | ![(b) and (d) are the grad-cam image of (a) and (c) respectively](<notebooks/images/densenet121_wave/evaluation/grad_cam.png> '(b) and (d) are the grad-cam image of (a) and (c) respectively') | 
    :-:
    |Fig: (b) and (d) are the grad-cam image of (a) and (c) respectively|
    
    <!-- ![Heatmap Wave Images(Train)](<notebooks/images/densenet121_wave/sample_of_gradcam_img(train).png> 'Heatmap Wave Images(Train)')
    ![Heatmap Wave Images(Test)](<notebooks/images/densenet121_wave/sample_of_gradcam_img(test).png> 'Heatmap Wave Images(Test)') -->

  - Evaluation

    ![Confusion Matrix](<notebooks/images/densenet121_wave/evaluation/confusion_matrix.png> 'Confusion Matrix')
    
    ![Classification Report](<notebooks/images/densenet121_wave/evaluation/classification_report.png> 'Classification Report') 

    ![Class Prediction Error](<notebooks/images/densenet121_wave/evaluation/class_prediction_error.png> 'Class Prediction Error') 

- _Spiral_ Dataset with **Inception V3**

  - Original

    | ![(a) and (b) represents the train set sample, (c) and (d) are the test set sample of spiral dataset](<notebooks/images/sample_train_test_spiral.png> '(a) and (b) represents the train set sample, (c) and (d) are the test set sample of spiral dataset') | 
    :-:
    |Fig: (a) and (b) represents the train set sample, (c) and (d) are the test set sample of spiral dataset|

  - Heatmap

    ![Heatmap Wave Images(Train)](<notebooks/images/inception_v3_spiral/sample_of_heatmap_img(train).png> 'Heatmap Spiral Images(Train)')
    ![Heatmap Wave Images(Test)](<notebooks/images/inception_v3_spiral/sample_of_heatmap_img(test).png> 'Heatmap Spiral Images(Test)')

  - Grad-Cam

    | ![(b) and (d) are the grad-cam image of (a) and (c) respectively](<notebooks/images/inception_v3_spiral/evaluation/grad_cam.png> '(b) and (d) are the grad-cam image of (a) and (c) respectively') | 
    :-:
    |Fig: (b) and (d) are the grad-cam image of (a) and (c) respectively|

    <!-- ![Heatmap Wave Images(Train)](<notebooks/images/inception_v3_spiral/sample_of_gradcam_img(test).png> 'Heatmap Spiral Images(Train)')
    ![Heatmap Wave Images(Test)](<notebooks/images/inception_v3_spiral/sample_of_gradcam_img(test).png> 'Heatmap Spiral Images(Test)') -->

  - Evaluation

    ![Confusion Matrix](<notebooks/images/inception_v3_spiral/evaluation/confusion_matrix.png> 'Confusion Matrix')
    
    ![Classification Report](<notebooks/images/inception_v3_spiral/evaluation/classification_report.png> 'Classification Report') 

    ![Class Prediction Error](<notebooks/images/inception_v3_spiral/evaluation/class_prediction_error.png> 'Class Prediction Error') 

> Installation

- `git clone https://github.com/rjarman/parkinson-disease-classification.git`
- `cd parkinson-disease-classification/notebooks`
- `pip install -r requirements.txt`
  /media/rafsun/Working Drive/projects/parkinson-disease-classification/notebooks/images/densenet121_wave
