# qure.ai 
  ## Interview Assignment

**Objective** - A simple Progressive Web App that takes and image and returns the probabilities of the top 5 predictions.

The application is built on

Frontend
  - React
    - [Ant Design](https://ant.design/docs/react/introduce) (React UI Library)
 
 Backend
  - Django
    - using a pretrained [resnet18](https://pytorch.org/hub/pytorch_vision_resnet/) model for image prediction 

https://user-images.githubusercontent.com/31702986/159155266-7e72df46-e83c-4b7c-9627-138ca1e902b9.mp4

## Setup

**React**
---
  make sure you're in the folder containing `pacakge.json`
  run the following:
  ```
    npm install
    npm start
 ```
 
 **Django**
 ---
  make sure you're in the backend folder
  
  First Create a virtual env
  ```
  virtualenv env
  ..path_to_env\Scripts\activate
  ```
  
  Install tha packages
  ```
  pip install -r requirements.txt
  ```
  
  navigate to the folder containing `manage.py`
  ```
  python manage.py runserver
  ```
