from rest_framework.views import APIView
from django.http import Http404
from rest_framework.response import Response
from rest_framework import status
from trip_items.models import TripItem
from trip_items.serializers import TripItemSerializer
# Create your views here.

class TripItemIndex(APIView):

    def get(self, request, format=None):
        items = TripItem.objects.all()
        serializer = TripItemSerializer(items, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = TripItemSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class TripItemDetail(APIView):

    def get_object(self, pk):
        try:
            return TripItem.objects.get(pk=pk)
        except TripItem.DoesNotExist:
            raise Http404

    def get(self, reuqest, pk, format=None):
        item = self.get_object(pk)
        serializer = TripItemSerializer(item)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        item = self.get_object(pk)
        serializer = TripItemSerializer(item, data= request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        item = self.get_object(pk)
        item.delete()
        return Response(status.HTTP_204_NO_CONTENT)
