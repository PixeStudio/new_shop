export class ModalManager {
    constructor(modalElement, options = {}) {
        this.modal = modalElement;
        this.blur = options.blur || null;
        this.closeBtn = options.closeBtn || null;
        this.onCloseCallback = null;
        this.init();
    }

    init() {
        this.setupEscape();
        this.setupBlurClick();
        this.setupCloseButton();
    }

    showModal() {
        if (this.modal) this.modal.classList.remove("hidden");
        if (this.blur) this.blur.classList.remove("hidden");
    }

    hideModal() {
        if (this.modal) this.modal.classList.add("hidden");
        if (this.blur) this.blur.classList.add("hidden");
        if (typeof this.onCloseCallback === "function") {
            this.onCloseCallback();
        };
    }

    toggleModal() {
        if (this.modal.classList.contains("hidden")) {
            this.showModal();
        } else {
            this.hideModal();
        }
    }

    isVisible() {
        return !this.modal.classList.contains("hidden");
    }

    onClose(callback) {
        this.onCloseCallback = callback;
    }

    setupEscape() {
        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape" && !this.modal.classList.contains("hidden")) {
                this.hideModal();
            }
        });
    }

    setupBlurClick() {
        if (this.blur) {
            this.blur.addEventListener("click", () => {
                this.hideModal();
            });
        }
    }

    setupCloseButton() {
        if (this.closeBtn) {
            this.closeBtn.addEventListener("click", () => {
                this.hideModal();
            });
        }
    }
}