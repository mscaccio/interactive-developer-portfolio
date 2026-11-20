/* ========================================
   Hamburger Navigation
   ======================================== */

const header = document.querySelector("header");
const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector("#primary-navigation");

if (header && menuButton && navigation) {
  const menuLabel = menuButton.querySelector(".menu-label");
  const desktopQuery = window.matchMedia("(min-width: 651px)");

  function setMenuOpen(isOpen) {
    navigation.classList.toggle("is-open", isOpen);
    menuButton.setAttribute("aria-expanded", String(isOpen));

    if (menuLabel) {
      menuLabel.textContent = isOpen ? "Close menu" : "Menu";
    }
  }

  // Enable the interactive menu
  header.classList.add("menu-enabled");
  menuButton.hidden = false;

  // Toggle the menu
  menuButton.addEventListener("click", () => {
    setMenuOpen(!navigation.classList.contains("is-open"));
  });

  // Close the menu when selecting a navigation link
  navigation.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      setMenuOpen(false);
    });
  });

  // Close the menu with Escape
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && navigation.classList.contains("is-open")) {
      setMenuOpen(false);

      if (!desktopQuery.matches) {
        menuButton.focus();
      }
    }
  });

  // Reset the menu when switching to desktop
  desktopQuery.addEventListener("change", (event) => {
    if (event.matches) {
      setMenuOpen(false);
    }
  });
}

/* ========================================
   Project Filtering
   ======================================== */

const projectFilters = document.querySelector(".project-filters");
const projectCards = document.querySelectorAll(".projects-grid > article");

if (projectFilters && projectCards.length) {
  const filterButtons = projectFilters.querySelectorAll("button");

  if (filterButtons.length) {
    function filterProjects(category) {
      // Show projects matching the selected category
      projectCards.forEach((project) => {
        const matches =
          category === "all" || project.dataset.category === category;

        project.hidden = !matches;
      });

      // Update the selected filter button
      filterButtons.forEach((button) => {
        const isSelected = button.dataset.filter === category;
        button.setAttribute("aria-pressed", String(isSelected));
      });
    }

    // Handle filter selections
    filterButtons.forEach((button) => {
      button.addEventListener("click", () => {
        filterProjects(button.dataset.filter);
      });
    });

    // Enable filtering after event handlers are ready
    projectFilters.hidden = false;
  }
}

/* ========================================
   Project Image Lightbox
   ======================================== */

const lightbox = document.querySelector("#project-lightbox");
const closeLightboxButton = lightbox?.querySelector(".lightbox-close");
const lightboxImage = lightbox?.querySelector("img");
const projectImageButtons = document.querySelectorAll(".project-image-button");

if (lightbox && closeLightboxButton && lightboxImage) {
  // Open the selected project image
  projectImageButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const image = button.querySelector("img");

      if (!image) return;

      lightboxImage.src = image.src;
      lightboxImage.alt = image.alt;

      lightbox.showModal();
    });
  });

  // Close the lightbox
  closeLightboxButton.addEventListener("click", () => {
    lightbox.close();
  });
}

/* ========================================
   Contact Form Validation and Submission
   ======================================== */

const contactForm = document.querySelector("#contact form");

if (contactForm) {
  const fields = contactForm.querySelectorAll(
    "input[required], textarea[required]",
  );
  const submitButton = contactForm.querySelector('button[type="submit"]');

  if (submitButton) {
    // Create submission feedback area
    const formStatus = document.createElement("p");
    formStatus.className = "form-status";
    formStatus.setAttribute("role", "status");
    formStatus.hidden = true;

    contactForm.append(formStatus);

    // Custom messages for required fields
    const requiredMessages = {
      name: "Please enter your name.",
      email: "Please enter your email address.",
      message: "Please enter a message.",
    };

    // Get the appropriate validation message
    function getErrorMessage(field) {
      if (field.validity.valueMissing) {
        return requiredMessages[field.name] ?? "This field is required.";
      }

      if (field.validity.customError) {
        return field.validationMessage;
      }

      if (field.validity.typeMismatch) {
        return "Please enter a valid email address.";
      }

      return field.validity.valid ? "" : field.validationMessage;
    }

    // Reject values containing only whitespace
    function validateWhitespace(field) {
      const onlyWhitespace =
        field.value.length > 0 && field.value.trim().length === 0;

      field.setCustomValidity(
        onlyWhitespace ? "This field cannot contain only spaces." : "",
      );
    }

    // Display or clear a field's validation error
    function updateFieldError(field) {
      const error = document.getElementById(`${field.id}-error`);
      if (!error) return;

      const message = getErrorMessage(field);

      error.textContent = message;
      error.hidden = !message;

      if (message) {
        field.setAttribute("aria-invalid", "true");
      } else {
        field.removeAttribute("aria-invalid");
      }
    }

    // Clear submission feedback
    function clearFormStatus() {
      formStatus.textContent = "";
      formStatus.hidden = true;
      delete formStatus.dataset.state;
    }

    // Display submission feedback
    function showFormStatus(message, state) {
      formStatus.textContent = message;
      formStatus.dataset.state = state;
      formStatus.hidden = false;
    }

    // Remove all field validation errors
    function clearFieldErrors() {
      fields.forEach((field) => {
        field.setCustomValidity("");
        field.removeAttribute("aria-invalid");

        const error = document.getElementById(`${field.id}-error`);

        if (error) {
          error.textContent = "";
          error.hidden = true;
        }
      });
    }

    // Set up validation for each required field
    fields.forEach((field) => {
      const error = document.createElement("small");
      error.id = `${field.id}-error`;
      error.className = "field-error";
      error.hidden = true;

      field.after(error);
      field.setAttribute("aria-describedby", error.id);

      // Validate when leaving a field
      field.addEventListener("blur", () => {
        validateWhitespace(field);
        updateFieldError(field);
      });

      // Revalidate fields with existing errors
      field.addEventListener("input", () => {
        validateWhitespace(field);

        if (field.hasAttribute("aria-invalid")) {
          updateFieldError(field);
        }

        clearFormStatus();
      });
    });

    // Validate all fields before submission
    function validateForm() {
      let firstInvalidField = null;

      fields.forEach((field) => {
        validateWhitespace(field);
        updateFieldError(field);

        if (!field.validity.valid && !firstInvalidField) {
          firstInvalidField = field;
        }
      });

      if (firstInvalidField) {
        firstInvalidField.focus();
        return false;
      }

      return true;
    }

    // Simulate an asynchronous server request
    function simulateSubmission() {
      return new Promise((resolve) => {
        setTimeout(resolve, 1000);
      });
    }

    // Handle form submission
    contactForm.addEventListener("submit", async (event) => {
      event.preventDefault();

      if (submitButton.disabled) return;

      // Remove feedback from any previous submission
      clearFormStatus();

      // Stop if validation fails
      if (!validateForm()) return;

      // Prevent changes during submission
      fields.forEach((field) => {
        field.readOnly = true;
      });

      // Prevent duplicate submissions
      submitButton.disabled = true;
      submitButton.textContent = "Sending...";

      try {
        // Simulate the asynchronous request
        await simulateSubmission();

        // Clear the form after successful simulation
        contactForm.reset();
        clearFieldErrors();

        // Display success feedback
        showFormStatus("Your message has been sent successfully!", "success");
      } catch (error) {
        console.error("Form submission failed:", error);

        showFormStatus(
          "Unable to send your message. Please try again.",
          "error",
        );
      } finally {
        // Allow editing again
        fields.forEach((field) => {
          field.readOnly = false;
        });

        // Restore the submit button
        submitButton.disabled = false;
        submitButton.textContent = "Send Message";
      }
    });

    // Use custom validation only when JavaScript is ready
    contactForm.noValidate = true;
  }
}

/* ========================================
   Back to Top
   ======================================== */

const backToTop = document.querySelector(".back-to-top");
const footer = document.querySelector("footer");

if (backToTop && footer) {
  function updateBackToTop() {
    // Show the button after scrolling 300px
    const isVisible = window.scrollY > 300;
    backToTop.classList.toggle("is-visible", isVisible);

    // Position the button above the footer
    const footerTop = footer.getBoundingClientRect().top;
    const footerOverlap = Math.max(0, window.innerHeight - footerTop);

    const defaultBottom = 24;
    const buttonHeight = backToTop.offsetHeight;
    const maximumBottom = Math.max(
      defaultBottom,
      window.innerHeight - buttonHeight - defaultBottom,
    );

    const bottom = Math.min(defaultBottom + footerOverlap, maximumBottom);

    backToTop.style.bottom = `${bottom}px`;
  }

  // Update on scrolling and resizing
  window.addEventListener("scroll", updateBackToTop, {
    passive: true,
  });

  window.addEventListener("resize", updateBackToTop);

  // Initialise the position and visibility
  updateBackToTop();
}
