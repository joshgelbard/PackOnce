# from django.http import HttpResponse, JsonResponse
# from django.views.decorators.csrf import csrf_exempt
# from rest_framework.renderers import JSONRenderer
# from rest_framework.parsers import JSONParser
# from rest_framework.decorators import api_view

from rest_framework.views import APIView
from django.http import Http404
from rest_framework.response import Response
from rest_framework import status
from trips.models import Trip
from trips.serializers import TripSerializer

# @csrf_exempt

class TripList(APIView):

    def get(self, request, format=None):
        trips = Trip.objects.all()
        serializer = TripSerializer(trips, many=True)
        return Response(serializer.data)

        def post(self, request, format=None):
            serializer = TripSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class TripDetail(APIView):

    def get_object(self, pk):
        try:
            return Trip.objects.get(pk=pk)
        except Trip.DoesNotExist:
            raise Http404

    def get(self, reuqest, pk, format=None):
        trip = self.get_object(pk)
        serializer = TripSerializer(trip)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        trip = self.get_object(pk)
        serializer = TripSerializer(trip, data= request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        trip = self.get_object(pk)
        trip.delete()
        return Response(status.HTTP_204_NO_CONTENT)




# @api_view(['GET', 'POST'])
# def trip_list(request, format=None):
#     """
#     All trips, or create new trip.
#     """
#
#     if request.method == 'GET':
#         trips = Trip.objects.all()
#         serializer = TripSerializer(trips, many = True)
#         return Response(serializer.data)
#
#     elif request.method == 'POST':
#         serializer = TripSerializer(data=data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
#
# # @csrf_exempt
# @api_view(['GET','PUT','DELETE'])
# def trip_detail(request, pk, format=None):
#
#     try:
#         trip = Trip.objects.get(pk=pk)
#     except Trip.DoesNotExist:
#         return Response(status=status.HTTP_404_NOT_FOUND)
#
#     if request.method == 'GET':
#         serializer = TripSerializer(trip)
#         return Response(serializer.data)
#
#     elif request.method == 'PUT':
#         serializer = TripSerializer(trip, data=reuqest.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
#
#     elif request.method == 'DELETE':
#         trip.delete()
#         return Response(status=status.HTTP_204_NO_CONTENT)
