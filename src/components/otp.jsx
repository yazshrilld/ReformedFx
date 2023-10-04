import React from "react";

const isStyleObject = (obj) => typeof obj === "object" && obj !== null;

const OTPInput = ({
  value = "",
  numInputs = 4,
  onChange,
  renderInput,
  shouldAutoFocus = false,
  inputType = "password",
  renderSeparator,
  placeholder,
  containerStyle,
  inputStyle,
}) => {
  const [activeInput, setActiveInput] = React.useState(0);
  const inputRefs = React.useRef([]);

  const getOTPValue = () => (value ? value.toString().split("") : []);

  const isInputNum = inputType === "number" || inputType === "tel";

  React.useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, numInputs);
  }, [numInputs]);

  React.useEffect(() => {
    if (shouldAutoFocus) {
      inputRefs.current[0]?.focus();
    }
  }, [shouldAutoFocus]);

  const getPlaceholderValue = () => {
    if (typeof placeholder === "string") {
      if (placeholder.length === numInputs) {
        return placeholder;
      }

      if (placeholder.length > 0) {
        console.error(
          "Length of the placeholder should be equal to the number of inputs."
        );
      }
    }
    return undefined;
  };

  const isInputValueValid = (value) => {
    const isTypeValid = isInputNum
      ? !isNaN(Number(value))
      : typeof value === "string";
    return isTypeValid && value.trim().length === 1;
  };

  const handleChange = (event) => {
    const { value } = event.target;

    if (isInputValueValid(value)) {
      changeCodeAtFocus(value);
      focusInput(activeInput + 1);
    }
  };

  const handleInputChange = (event) => {
    const { nativeEvent } = event;
    if (!isInputValueValid(event.target.value)) {
      if (
        nativeEvent.data === null &&
        nativeEvent.inputType === "deleteContentBackward"
      ) {
        event.preventDefault();
        changeCodeAtFocus("");
        focusInput(activeInput - 1);
      }
      // Clear the input if it's not valid value because firefox allows
      // pasting non-numeric characters in a number type input
      event.target.value = "";
    }
  };

  const handleFocus = (event) => (index) => {
    setActiveInput(index);
    event.target.select();
  };

  const handleBlur = () => {
    setActiveInput(activeInput - 1);
  };

  const handleKeyDown = (event) => {
    const otp = getOTPValue();
    if ([event.code, event.key].includes("Backspace")) {
      event.preventDefault();
      changeCodeAtFocus("");
      focusInput(activeInput - 1);
    } else if (event.code === "Delete") {
      event.preventDefault();
      changeCodeAtFocus("");
    } else if (event.code === "ArrowLeft") {
      event.preventDefault();
      focusInput(activeInput - 1);
    } else if (event.code === "ArrowRight") {
      event.preventDefault();
      focusInput(activeInput + 1);
    }
    // React does not trigger onChange when the same value is entered
    // again. So we need to focus the next input manually in this case.
    else if (event.key === otp[activeInput]) {
      event.preventDefault();
      focusInput(activeInput + 1);
    } else if (
      event.code === "Spacebar" ||
      event.code === "Space" ||
      event.code === "ArrowUp" ||
      event.code === "ArrowDown"
    ) {
      event.preventDefault();
    }
  };

  const focusInput = (index) => {
    const activeInput = Math.max(Math.min(numInputs - 1, index), 0);

    if (inputRefs.current[activeInput]) {
      inputRefs.current[activeInput]?.focus();
      inputRefs.current[activeInput]?.select();
      setActiveInput(activeInput);
    }
  };

  const changeCodeAtFocus = (value) => {
    const otp = getOTPValue();
    otp[activeInput] = value[0];
    handleOTPChange(otp);
  };

  const handleOTPChange = (otp) => {
    const otpValue = otp.join("");
    onChange(otpValue);
  };

  const handlePaste = (event) => {
    event.preventDefault();

    const otp = getOTPValue();
    let nextActiveInput = activeInput;

    // Get pastedData in an array of max size (num of inputs - current position)
    const pastedData = event.clipboardData
      .getData("text/plain")
      .slice(0, numInputs - activeInput)
      .split("");

    // Prevent pasting if the clipboard data contains non-numeric values for number inputs
    if (isInputNum && pastedData.some((value) => isNaN(Number(value)))) {
      return;
    }

    // Paste data from focused input onwards
    for (let pos = 0; pos < numInputs; ++pos) {
      if (pos >= activeInput && pastedData.length > 0) {
        otp[pos] = pastedData.shift() ?? "";
        nextActiveInput++;
      }
    }

    focusInput(nextActiveInput);
    handleOTPChange(otp);
  };

  return (
    <div
      style={Object.assign(
        { display: "flex", alignItems: "center" },
        isStyleObject(containerStyle) && containerStyle
      )}
      className={
        typeof containerStyle === "string" ? containerStyle : undefined
      }
    >
      {Array.from({ length: numInputs }, (_, index) => index).map((index) => (
        <React.Fragment key={index}>
          {renderInput(
            {
              value: getOTPValue()[index] ?? "",
              placeholder: getPlaceholderValue()?.[index] ?? undefined,
              ref: (element) => (inputRefs.current[index] = element),
              onChange: handleChange,
              onFocus: (event) => handleFocus(event)(index),
              onBlur: handleBlur,
              onKeyDown: handleKeyDown,
              onPaste: handlePaste,
              autoComplete: "off",
              maxLength: 1,
              "aria-label": `Please enter OTP character ${index + 1}`,
              style: Object.assign(
                { width: "1em", textAlign: "center" },
                isStyleObject(inputStyle) && inputStyle
              ),
              className:
                typeof inputStyle === "string" ? inputStyle : undefined,
              type: inputType,
              inputMode: isInputNum ? "numeric" : "text",
              onInput: handleInputChange,
            },
            index
          )}
          {index < numInputs - 1 &&
            (typeof renderSeparator === "function"
              ? renderSeparator(index)
              : renderSeparator)}
        </React.Fragment>
      ))}
    </div>
  );
};

export default OTPInput;
