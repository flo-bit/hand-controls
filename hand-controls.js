/**
 * vector class for 2D, 3D and 4D vectors
 *
 */
class Vector {
  /**
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @param {number} w
   * @returns {Vector}
   * @constructor
   */
  constructor(x, y, z, w) {
    if (x != undefined && typeof x == "object" && x.x != undefined) {
      this.copy(x);
    } else {
      this.set(x || 0, y || 0, z, w);
    }

    this.isVector = true;

    this.is2D = z == undefined;
    this.is3D = !this.is2D && w == undefined;
    this.is4D = !this.is2D && !this.is3D;
    return this;
  }
  copy(vec) {
    this.x = vec.x;
    this.y = vec.y;
    this.z = vec.z;
    this.w = vec.w;

    return this;
  }
  clone() {
    return new Vector(this.x, this.y, this.z, this.w);
  }
  set(x, y, z, w) {
    if (typeof x != "number" && x.x != undefined) {
      return this.copy(x);
    }
    if (y == undefined && z == undefined && w == undefined) {
      if (this.is2D) this.set(x, x);
      if (this.is3D) this.set(x, x, x);
      if (this.is4D) this.set(x, x, x, x);
    }
    this.x = x;
    this.y = y;
    this.z = z;
    this.w = w;
    return this;
  }
  add(x, y, z, w) {
    if (typeof x != "number" && x.x != undefined) {
      return this.add(x.x, x.y, x.z, x.w);
    }
    if (y == undefined && z == undefined && w == undefined) {
      if (this.is2D) this.add(x, x);
      if (this.is3D) this.add(x, x, x);
      if (this.is4D) this.add(x, x, x, x);
    }
    this.x += x || 0;
    this.y += y || 0;
    this.z += z || 0;
    this.w += w || 0;
    return this;
  }
  sub(x, y, z, w) {
    if (typeof x != "number" && x.x != undefined) {
      return this.sub(x.x, x.y, x.z, x.w);
    }
    if (y == undefined && z == undefined && w == undefined) {
      if (this.is2D) this.sub(x, x);
      if (this.is3D) this.sub(x, x, x);
      if (this.is4D) this.sub(x, x, x, x);
    }
    this.x -= x || 0;
    this.y -= y || 0;
    this.z -= z || 0;
    this.w -= w || 0;
    return this;
  }
  mult(x, y, z, w) {
    if (typeof x != "number" && x.x != undefined) {
      return this.mult(x.x, x.y, x.z, x.w);
    }
    if (y == undefined && z == undefined && w == undefined) {
      if (this.is2D) this.mult(x, x);
      if (this.is3D) this.mult(x, x, x);
      if (this.is4D) this.mult(x, x, x, x);
    }
    this.x *= x || 0;
    this.y *= y || 0;
    this.z *= z || 0;
    this.w *= w || 0;
    return this;
  }
  div(x, y, z, w) {
    if (typeof x != "number" && x.x != undefined) {
      return this.div(m.x, x.y, x.z, x.w);
    }
    if (y == undefined && z == undefined && w == undefined) {
      if (this.is2D) this.div(x, x);
      if (this.is3D) this.div(x, x, x);
      if (this.is4D) this.div(x, x, x, x);
    }
    this.x /= x || 0;
    this.y /= y || 0;
    this.z /= z || 0;
    this.w /= w || 0;
    return this;
  }
  dot(vec) {
    return (
      this.x * vec.x +
      this.y * vec.y +
      (this.z != undefined ? this.z * vec.z : 0) +
      (this.w != undefined ? this.w * vec.w : 0)
    );
  }
  // 3D only
  cross(vec) {
    if (!this.is3D || !vec.is3D)
      console.warn("cross(vec) only supports 3D vectors");
    return new Vector(
      this.y * vec.z - this.z * vec.y,
      this.z * vec.x - this.x * vec.z,
      this.x * vec.y - this.y * vec.x
    );
  }

  dist(x, y, z, w) {
    if (typeof x != "number" && x.x != undefined) {
      return this.dist(x.x, x.y, x.z, x.w);
    }
    let sum = 0;
    let dx = this.x - x;
    sum += dx * dx;
    let dy = (this.y || 0) - (y || 0);
    sum += dy * dy;
    let dz = (this.z || 0) - (z || 0);
    sum += dz * dz;
    let dw = (this.w || 0) - (w || 0);
    sum += dw * dw;
    return Math.sqrt(sum);
  }
  distance(x, y, z, w) {
    return this.dist(x, y, z, w);
  }
  distanceTo(x, y, z, w) {
    return this.dist(x, y, z, w);
  }
  length() {
    return Math.sqrt(
      this.x * this.x +
        this.y * this.y +
        (this.z || 0) * (this.z || 0) +
        (this.w || 0) * (this.w || 0)
    );
  }

  setLength(l) {
    this.mult(l / this.length());
    return this;
  }
  limit(l) {
    let length = this.length();
    if (length > l) this.mult(length / l);
    return this;
  }

  // 2d only
  heading() {
    if (!this.is2D) console.warn("heading() only supports 2D vectors");

    return Math.atan2(this.x, this.y);
  }
  // 2d only
  rotate(a) {
    if (!this.is2D) console.warn("rotate(a) only supports 2D vectors");

    let ca = Math.cos(a);
    let sa = Math.sin(a);
    this.set(ca * this.x - sa * this.y, sa * this.x + ca * this.y);
    return this;
  }

  angleBetween(vec) {
    let d = this.dot(vec);
    let l = this.length() * vec.length();
    return Math.acos(d / l);
  }
  angleTo(vec) {
    return this.angleBetween(vec);
  }
  equals(vec) {
    return (
      this.x == vec.x && this.y == vec.y && this.z == vec.z && this.w == vec.w
    );
  }

  normalize() {
    this.setLength(1);
    return this;
  }
  mag() {
    return this.length();
  }
  setMag(m) {
    this.setLength(m);
    return this;
  }
  manhattanLength() {
    return this.x + this.y + (this.z || 0) + (this.w || 0);
  }
  lerp(vec, a) {
    let dx = vec.x - this.x;
    let dy = vec.y - this.y;
    let dz = vec.z - this.z;
    let dw = vec.w - this.w;
    this.add(dx * a, dy * a, dz * a, dw * a);
    return this;
  }

  stringDescription() {
    let dimension = this.is2D ? "2D" : this.is3D ? "3D" : "4D";
    let str = dimension + " vec (" + this.x + ", " + this.y;
    if (this.z != undefined) str += ", " + this.z;
    if (this.w != undefined) str += ", " + this.w;
    str += ")";
    return str;
  }

  // 2d vector from angle and optional length (default length 1)
  static fromAngle2D(a, l) {
    let v = new Vector(Math.cos(a), Math.sin(a));
    if (l) v.setLength(l);
    return v;
  }

  // random 2d vector with length between 0 and 1
  // or set length
  static random2D(l, random = Math.random) {
    let v = new Vector(random() * 2 - 1, random() * 2 - 1);
    while (v.length() > 1) {
      v.set(random() * 2 - 1, random() * 2 - 1);
    }
    if (l) v.setLength(l);
    return v;
  }

  // random 3d vector with length between 0 and 1
  // or set length
  static random3D(l, random = Math.random) {
    let v = new Vector(random() * 2 - 1, random() * 2 - 1, random() * 2 - 1);
    while (v.length() > 1) {
      v.set(random() * 2 - 1, random() * 2 - 1, random() * 2 - 1);
    }
    if (l) v.setLength(l);
    return v;
  }

  static breakIntoParts(a, b, parts) {
    if (a == undefined || b == undefined || !a.isVector || !b.isVector) return;

    parts = Math.floor(parts || 2);
    let arr = [a.clone()];
    for (let i = 1; i < parts; i++) {
      arr.push(a.clone().lerp(b, i / parts));
    }
    arr.push(b.clone());
    return arr;
  }
}

class HandControls {
  constructor(opts) {
    opts = opts || {};
    this.onResults = opts.onResults;
    this.showResults = opts.showResults;

    this.loadScripts();
  }

  loadScripts() {
    const scripts = [
      "https://cdn.jsdelivr.net/npm/@mediapipe/camera_utils/camera_utils.js",
      "https://cdn.jsdelivr.net/npm/@mediapipe/control_utils/control_utils.js",
      "https://cdn.jsdelivr.net/npm/@mediapipe/drawing_utils/drawing_utils.js",
      "https://cdn.jsdelivr.net/npm/@mediapipe/hands/hands.js",
    ];
    let scriptPromises = [];
    for (var script of scripts) {
      var scriptElement = document.createElement("script");
      scriptPromises.push(
        new Promise((resolve, reject) => {
          scriptElement.onload = function () {
            resolve();
          };
          scriptElement.onerror = function () {
            reject();
          };
        })
      );
      scriptElement.src = script;
      document.head.appendChild(scriptElement);
    }

    Promise.all(scriptPromises).then((values) => {
      console.log("all scripts loaded");
      this.setup();
    });
  }

  setup() {
    const hands = new Hands({
      locateFile: (file) => {
        return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
      },
    });
    hands.setOptions({
      maxNumHands: 2,
      modelComplexity: 1,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5,
    });
    hands.onResults(this.gotResults.bind(this));

    const video = document.createElement("video");
    video.style.display = "none";
    const camera = new Camera(video, {
      onFrame: async () => {
        await hands.send({ image: video });
      },
      width: 1280,
      height: 720,
    });
    camera.start();
  }

  gotResults(results) {
    this.processResults(results);
    if (
      this.onResults != undefined &&
      results.multiHandLandmarks != undefined &&
      results.multiHandLandmarks.length > 0
    ) {
      this.onResults(results);
    }

    if (this.showResults) this.displayResults(results);
  }
  processResults(results) {
    if (
      results.multiHandLandmarks == undefined ||
      results.multiHandLandmarks.length == 0
    )
      return;

    let hands = [];

    let data = [];
    for (const landmarks of results.multiHandLandmarks) {
      let handMin = { x: landmarks[0].x, y: landmarks[0].y };
      let handMax = { x: landmarks[0].x, y: landmarks[0].y };
      for (let i = 1; i < landmarks.length; i++) {
        handMin.x = Math.min(handMin.x, landmarks[i].x);
        handMin.y = Math.min(handMin.y, landmarks[i].y);

        handMax.x = Math.max(handMax.x, landmarks[i].x);
        handMax.y = Math.max(handMax.y, landmarks[i].y);
      }

      let normalized = [];
      let maxDist = Math.max(handMax.x - handMin.x, handMax.y - handMin.y);
      for (let i = 0; i < landmarks.length; i++) {
        normalized.push({
          x: (landmarks[i].x - handMin.x) / maxDist,
          y: (landmarks[i].y - handMin.y) / maxDist,
        });
      }
      // calculate normalized center
      /*let center = {
        x: (handMax.x + handMin.x) / 2,
        y: (handMax.y + handMin.y) / 2,
      };*/
      //console.log(center);
      /*
      let fingers = {
        thumb: [normalized[1], normalized[2], normalized[3], normalized[4]],
        index: [normalized[5], normalized[6], normalized[7], normalized[8]],
        middle: [normalized[9], normalized[10], normalized[11], normalized[12]],
        ring: [normalized[13], normalized[14], normalized[15], normalized[16]],
        pinky: [normalized[17], normalized[18], normalized[19], normalized[20]],
        palm: [
          normalized[0],
          normalized[5],
          normalized[9],
          normalized[13],
          normalized[17],
        ],
      };

      let hand = {
        fingers: fingers,
        array: normalized,
      };*/
      hands.push(normalized);

      let palmToIndex = this.vectorBetween(landmarks[0], landmarks[5]);
      let indexToTop = this.vectorBetween(landmarks[7], landmarks[8]);

      let palmToIndexAngle = palmToIndex.angleTo(indexToTop);

      if (this.lastPalmToIndexAngle != undefined) {
        if (this.lastPalmToIndexAngle < 1 && palmToIndexAngle > 1) {
          //console.log("tap");
        }
        if (this.lastPalmToIndexAngle > 1 && palmToIndexAngle < 1) {
          //console.log("untap");
        }
      }
      this.lastPalmToIndexAngle = palmToIndexAngle;

      let indexThumbDist = this.vectorBetween(
        landmarks[4],
        landmarks[8]
      ).length();

      if (this.lastIndexThumbDist != undefined) {
        if (this.lastIndexThumbDist < 0.05 && indexThumbDist > 0.05) {
          console.log("unpinch");
        }
        if (this.lastIndexThumbDist > 0.05 && indexThumbDist < 0.05) {
          console.log("pinch");
        }
      }
      this.lastIndexThumbDist = indexThumbDist;
      data.push({
        indexAngle: palmToIndexAngle,
        indexThumbDist: indexThumbDist,
      });
    }

    results.normalizedLandmarks = hands;
    results.data = data;
  }

  vectorBetween(p1, p2) {
    return new Vector(p2.x - p1.x, p2.y - p1.y, p2.z - p1.z);
  }

  displayResults(results) {
    if (this.canvasCtx == undefined || this.canvasElement == undefined) {
      this.canvasElement = document.createElement("canvas");
      this.canvasCtx = this.canvasElement.getContext("2d");
      this.canvasElement.style = "position: absolute; z-index: 100";
      document.body.appendChild(this.canvasElement);
    }
    this.canvasCtx.save();
    this.canvasCtx.clearRect(
      0,
      0,
      this.canvasElement.width,
      this.canvasElement.height
    );
    this.canvasCtx.drawImage(
      results.image,
      0,
      0,
      this.canvasElement.width,
      this.canvasElement.height
    );
    // HAND_CONNECTIONS is a global variable defined in drawing_utils.js
    // contains an array of connections between landmarks
    // each connection is an array with two indices of the two connected landmarks

    if (results.multiHandLandmarks) {
      for (const landmarks of results.multiHandLandmarks) {
        drawConnectors(this.canvasCtx, landmarks, HAND_CONNECTIONS, {
          color: "#888888",
          lineWidth: 2,
        });
        drawLandmarks(this.canvasCtx, landmarks, {
          color: "#0",
          radius: 1,
        });
      }
    }
    this.canvasCtx.restore();
  }
}
