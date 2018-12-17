# motajs-notify
Very simple browser notification.

## Getting Started
Insert css and js files

```html
<link rel="stylesheet" href="../dist/css/notify.min.css">
<script src="../dist/js/notify.min.js"></script>
```

and use!

```javascript
    notify.success('Your message notification', 4000);
    // or notify.success('Your message notification');
    // timout is default 5000 ms
```

notifications supported
```js
    notify.error('This is an erro notification');
    notify.warning('This is a warning notification');
    notify.info('This is an info notification');
    notify.success('This is a success notification');

    // or

    notify.show('Message text', 'messageType', timout);
    // messageType: 'error' | 'info' | 'success' | 'warning'
```


## Authors
* **Jeferson Mota** 

## License
MIT
