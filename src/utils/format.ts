import CurrencyList from 'currency-list';

export const formatPrice = (price: number, currency?: string): string => {
  return `${(price / 100).toFixed(2)}${
    currency ? CurrencyList.get(currency).symbol : '€'
  }`;
};

function interpolate(
  input: number,
  inputMin: number,
  inputMax: number,
  outputMin: number,
  outputMax: number,
  easing: (input: number) => number,
) {
  let result = input;

  if (outputMin === outputMax) {
    return outputMin;
  }

  if (inputMin === inputMax) {
    if (input <= inputMin) {
      return outputMin;
    }
    return outputMax;
  }

  // Input Range
  if (inputMin === -Infinity) {
    result = -result;
  } else if (inputMax === Infinity) {
    result = result - inputMin;
  } else {
    result = (result - inputMin) / (inputMax - inputMin);
  }

  // Easing
  result = easing(result);

  // Output Range
  if (outputMin === -Infinity) {
    result = -result;
  } else if (outputMax === Infinity) {
    result = result + outputMin;
  } else {
    result = result * (outputMax - outputMin) + outputMin;
  }

  return result;
}

function findRange(input: number, inputRange: number[]) {
  let i;
  for (i = 1; i < inputRange.length - 1; ++i) {
    if (inputRange[i] >= input) {
      break;
    }
  }
  return i - 1;
}

export const createNumericInterpolation = (config: {
  inputRange: number[];
  outputRange: number[];
}): ((input: number) => number) => {
  const outputRange = config.outputRange;
  const inputRange = config.inputRange;

  const easing = (x) => x;

  return (input) => {
    const range = findRange(input, inputRange);
    return interpolate(
      input,
      inputRange[range],
      inputRange[range + 1],
      outputRange[range],
      outputRange[range + 1],
      easing,
    );
  };
};
