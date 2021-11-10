//document.getElementById("active_input").focus();

window.validateForm = function validateForm(submitId) {
  const parent = document.getElementById(submitId).parentElement;
  validateFormNode(parent);
  return false;
};

const setHelpTextOnChild = (node, message) => {
  let found = null;
  node.childNodes.forEach((childNode) => {
    if (
      childNode.tagName === "SPAN" &&
      childNode.getAttribute("class") === "form_help"
    ) {
      if (found) {
        console.error(
          "error on form, element with validation must contain only one span with class 'form_help'. element:",
          node
        );
      } else {
        found = childNode;
      }
    }
  });
  if (!found) {
    console.error(
      "error on form, element with validation must contain span with class 'form_help'. element:",
      node
    );
  } else {
    found.textContent = message;
  }
};

window.handleCorrectedInput = function handleCorrectedInput(node) {
  validateFormNode(node);
};

const validateFormNode = (node) => {
  if (node.hasChildNodes()) {
    node.childNodes.forEach((child) => {
      validateFormNode(child);
    });
  } else if (node.tagName === "INPUT") {
    const minlength = node.getAttribute("minlength");
    if (minlength !== null)
      if (node.value.length < minlength) {
        node.classList.add("invalid");
        setHelpTextOnChild(node.parentElement, "Text too short.");
      } else if (
        node.value.length >= minlength &&
        node.classList.contains("invalid")
      ) {
        node.classList.remove("invalid");
        setHelpTextOnChild(node.parentElement, "");
      }
  }
};
