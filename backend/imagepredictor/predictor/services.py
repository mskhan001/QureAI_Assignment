import torch
from django.conf import settings
from PIL import Image
from torchvision import transforms


# takes image as an input and returns a list of top 5 predictions with probabilities
def predict(image):
    input_image = Image.open(image)
    model = torch.hub.load('pytorch/vision:v0.10.0',
                           'resnet18', pretrained=True)
    model.eval()

    preprocess = transforms.Compose([
        transforms.Resize(256),
        transforms.CenterCrop(224),
        transforms.ToTensor(),
        transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[
                             0.229, 0.224, 0.225]),
    ])
    input_tensor = preprocess(input_image)
    # create a mini-batch as expected by the model
    input_batch = input_tensor.unsqueeze(0)

    # move the input and model to GPU for speed if available
    if torch.cuda.is_available():
        input_batch = input_batch.to('cuda')
        model.to('cuda')

    with torch.no_grad():
        output = model(input_batch)
    # The output has unnormalized scores. To get probabilities, you can run a softmax on it.
    probabilities = torch.nn.functional.softmax(output[0], dim=0)

    # Read the categories
    with open(str(settings.BASE_DIR)+"/predictor/imagenet_classes.txt", "r") as f:
        categories = [s.strip() for s in f.readlines()]
    # Show top categories per image
    top5_prob, top5_catid = torch.topk(probabilities, 5)

    result = []
    for i in range(top5_prob.size(0)):
        result.append(
            {'prediction': categories[top5_catid[i]], 'probability': round(top5_prob[i].item()*100, 2)})
    print(result)
    return result
