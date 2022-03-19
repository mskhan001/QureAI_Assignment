import json

from rest_framework.decorators import api_view
from rest_framework.response import Response

from .services import predict

# Create your views here.


@api_view(['POST'])
def postImage(request):
    if(request.FILES.get('file') is not None):
        result = predict(request.FILES.get('file'))
        return Response(json.loads(json.dumps(result)))
    return Response({"message": "Image File Not found"}, 400)
