export class ModalManager {
    constructor(modalElement, options = {}) {
        this.modal = modalElement;
        this.blur = options.blur || null;
        this.closeBtn = options.closeBtn || null;

        this.init();
    }

    init() {
        this.setupEscape();
        this.setupBlurClick();
        this.setupCloseButton();
    }

    hideModal() {
        if (this.modal) this.modal.classList.add("hidden");
        if (this.blur) this.blur.classList.add("hidden");
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