class Timer {
  constructor(root) {
    root.innerHTML = Timer.getHTML();
    this.el = {
      hours: root.querySelector(".timer-hour"),
      minutes: root.querySelector(".timer-minutes"),
      seconds: root.querySelector(".timer-seconds"),
      control: root.querySelector(".timer-btn-control"),
      reset: root.querySelector(".timer-btn-reset")
    };
    this.interval = null;
    this.remainingSeconds = 60;
    this.el.control.addEventListener("click", () => {
      if (this.interval === null) {
        this.start();
      } else {
        this.stop();
      }
    });
    this.el.reset.addEventListener("click", () => {
      this.el.control.classList.remove('not-active');
      this.stop();
      this.remainingSeconds = 60;
      this.setCount(0, 60);
    });
  }

  updateInterfaceTime() {
    const minutes = Math.floor(this.remainingSeconds / (60 * 60));
    const seconds = this.remainingSeconds % 60;
    if (seconds === 0) {
      this.stop();
    }
    this.setCount(minutes, seconds);
  }

  setCount (minutes, seconds) {
    if (this.remainingSeconds === 0) {
      this.el.control.classList.add('not-active');
    }
    document.documentElement.style.setProperty('--loadingSize', seconds);
    this.el.minutes.textContent = minutes.toString().padStart(2, "0");
    this.el.seconds.textContent = seconds.toString().padStart(2, "0");
  }

  updateInterfaceControls() {
    if (this.interval === null) {
      this.el.control.innerHTML = `Play`;
      this.el.control.classList.add("timer-start");
      this.el.control.classList.remove("timer-stop");
    } else {
      this.el.control.innerHTML = `Pause`;
      this.el.control.classList.add("timer-stop");
      this.el.control.classList.remove("timer-start");
    }
  }

  start() {
    this.interval = setInterval(() => {
      this.remainingSeconds--;
      this.updateInterfaceTime();
      if (this.remainingSeconds === 0) {
        this.stop();
      }
    }, 1000);
    this.updateInterfaceControls();
  }

  stop() {
    clearInterval(this.interval);
    this.interval = null;
    this.updateInterfaceControls();
  }

  static getHTML() {
    return `
            <div class="digital-time flex-box">
              <span class="timer-hour">00</span>
              <span>:</span>
              <span class="timer-minutes">00</span>
              <span>:</span>
              <span class="timer-seconds">00</span>
            </div>
            <div class="action-buttons flex-box">
            <div type="button" class="timer-btn timer-btn-control timer-btn-start">
                Start
            </div>
            <div type="button" class="timer-btn timer-btn-reset">
                Reset
            </div>
            </div>
        `;
  }
}

new Timer(
    document.querySelector("#timer")
);