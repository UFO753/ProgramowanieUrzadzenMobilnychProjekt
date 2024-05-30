const speedKmhElement = document.getElementById("speed-kmh");
const accelerationElement = document.getElementById("acceleration");
const canvas = document.getElementById("speedometer");
const canvascontext = canvas.getContext("2d");
let maxSpeed = 200;

function drawSpeedometer(speedKmh) {
  const radius = canvas.width / 2;
  canvascontext.clearRect(0, 0, canvas.width, canvas.height);

  canvascontext.beginPath();
  canvascontext.arc(
    radius,
    radius,
    radius,
    0.75 * Math.PI,
    0.25 * Math.PI,
    false
  );
  canvascontext.strokeStyle = "#ccc";
  canvascontext.lineWidth = 10;
  canvascontext.stroke();

  const angle = (speedKmh / maxSpeed) * (Math.PI * 1.5) + 0.75 * Math.PI;
  canvascontext.beginPath();
  canvascontext.moveTo(radius, radius);
  canvascontext.lineTo(
    radius + radius * Math.cos(angle),
    radius + radius * Math.sin(angle)
  );
  canvascontext.strokeStyle = "#f00";
  canvascontext.lineWidth = 5;
  canvascontext.stroke();

  canvascontext.font = "16px Arial";
  canvascontext.fillStyle = "#000";
  canvascontext.textAlign = "center";
  canvascontext.fillText(`${speedKmh.toFixed(2)} km/h`, radius, radius + 20);
}

function sendNotification(speedKmh) {
  if (Notification.permission === "granted") {
    if (speedKmh > 50) {
      new Notification("Uwaga!", {
        body: `Przekroczono prędkość 50 km/h! Aktualna prędkość: ${speedKmh.toFixed(
          2
        )} km/h`,
      });
    }
  }
}

if ("geolocation" in navigator) {
  navigator.geolocation.watchPosition(
    (position) => {
      const speed = position.coords.speed || 0;
      const speedKmh = speed * 3.6;
      speedKmhElement.textContent = speedKmh.toFixed(2);
      drawSpeedometer(speedKmh);
      sendNotification(speedKmh);
    },
    (error) => {
      console.error(error);
    },
    {
      enableHighAccuracy: true,
    }
  );
} else {
  alert("Brak możliwości odczytu prędkości.");
}

if (window.DeviceMotionEvent) {
  window.addEventListener("devicemotion", (event) => {
    const acc = event.accelerationIncludingGravity;
    const acceleration = Math.sqrt(acc.x ** 2 + acc.y ** 2 + acc.z ** 2);
    accelerationElement.textContent = acceleration.toFixed(2);
  });
} else {
  alert("Brak możliwości odczytu przyśpieszenia.");
}

document.addEventListener("DOMContentLoaded", () => {
  if (Notification.permission !== "granted") {
    Notification.requestPermission().then((permission) => {
      if (permission !== "granted") {
        alert("Nie wyświetlam powiadomień.");
      }
    });
  }
});
