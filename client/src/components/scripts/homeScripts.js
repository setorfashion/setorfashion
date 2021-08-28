function pinchZoom (evt){
    console.log(evt.target)
    const id = evt.target.id
    var imageElement = document.getElementById(id);

    let imageElementScale = 1;

    let start = {};

    // Calculate distance between two fingers
    const distance = (event) => {
        return Math.hypot(event.touches[0].pageX - event.touches[1].pageX, event.touches[0].pageY - event.touches[1].pageY);
    };

    imageElement.addEventListener('touchstart', (event) => {
        if (event.touches.length === 2) {
            event.preventDefault(); // Prevent page scroll      
            // Calculate where the fingers have started on the X and Y axis
            start.x = (event.touches[0].pageX + event.touches[1].pageX) / 2;
            start.y = (event.touches[0].pageY + event.touches[1].pageY) / 2;
            start.distance = distance(event);
        }
    });

    imageElement.addEventListener('touchmove', (event) => {
        if (event.touches.length === 2) {
            event.preventDefault(); // Prevent page scroll
            let scale;

            if (event.scale) {
                scale = event.scale;
            } else {
                const deltaDistance = distance(event);
                scale = deltaDistance / 200;
            }

            imageElementScale = Math.min(Math.max(1, scale), 4);

            const deltaX = (((event.touches[0].pageX + event.touches[1].pageX) / 2) - start.x) * 1; // x2 for accelarated movement
            const deltaY = (((event.touches[0].pageY + event.touches[1].pageY) / 2) - start.y) * 1; // x2 for accelarated movement

            const transform = `translate3d(${deltaX}px, ${deltaY}px, 0) scale(${imageElementScale})`;
            imageElement.style.transform = transform;
            imageElement.style.WebkitTransform = transform;
            imageElement.style.zIndex = "99999";
        }
    });

    imageElement.addEventListener('touchend', (event) => {
        imageElement.style.transform = "";
        imageElement.style.WebkitTransform = "";
        imageElement.style.zIndex = "";
    });
}
