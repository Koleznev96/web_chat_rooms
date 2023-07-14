from django.http import (
    HttpRequest,
    HttpResponse,
)
from django.shortcuts import render

from .models import ChatRoom


def index(request: HttpRequest) -> HttpResponse:
    return render(
        request=request, 
        template_name='chat/index.html', 
        context={
            'rooms': ChatRoom.objects.all(),
        },
    )


def room(request: HttpRequest, room_name: str) -> HttpResponse:
    return render(
        request=request, 
        template_name='chat/room.html', 
        context={
            'room_name': room_name,
        },
    )
