from django.contrib import admin
from .models import List, ListItem


class ListItemInline(admin.StackedInline):
    model = ListItem
    extra = 3


class ListAdmin(admin.ModelAdmin):
    fieldsets = [
        (None, {'fields': ['name', 'user']})
    ]
    inlines = [ListItemInline]


admin.site.register(List, ListAdmin)
