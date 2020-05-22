from rest_framework.response import Response

from .models import List, ListItem
from .serializers import ListSerializer, ListItemSerializer


class Mediator:
    def get_lists(self, request):
        my_lists = [ListSerializer(obj).data for obj in List.objects.filter(user=request.user)]
        return Response(my_lists)

    def add_list(self, request):
        print(request.data)
        serializer = ListSerializer(data=request.data)
        if serializer.is_valid():
            obj = serializer.save(user=request.user)
            print(obj)
        print(serializer.errors)

        return Response()

    def get_detailed_list(self, request, id):
        crt_list = List.objects.get(id=id)
        crt_list_serialized = ListSerializer(crt_list).data
        sorted_queryset = ListItem.objects.filter(parent_list=crt_list).order_by('id')
        list_items_serialized = [ListItemSerializer(obj).data for obj in sorted_queryset]

        return Response([crt_list_serialized, list_items_serialized])

    def add_list_item(self, request, id):
        print(request.data)
        crt_list = List.objects.get(id=id)
        serializer = ListItemSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(parent_list=crt_list)
        print(serializer.errors)

    def get_report(self, request, id):
        crt_list = List.objects.get(id=id)
        burndown = crt_list.get_burndown_rate()

        return Response(burndown)
