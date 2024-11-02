import { Console } from '@woowacourse/mission-utils';
import {
  isCostInUnits,
  isNumbersInRange,
  isValidatePositiveInteger,
  isWinningNumbersFormat,
} from './validatorUtils.js';
import throwError from '../Error/handleError.js';
import { ERROR_MESSAGES } from '../constants/errorMessage.js';
import { LOTTO_NUMBERS_LENGTH } from '../constants/constraints.js';

class InputValidator {
  static validatePurchaseCost(purchaseCost) {
    this.checkPositiveInteger(purchaseCost);
    if (!isCostInUnits(purchaseCost)) {
      throwError(ERROR_MESSAGES.INVALID_COST_UNITS);
    }
  }

  static validateNumbers(numbers) {
    this.checkLottoArray(numbers);
    this.checkDuplicates(numbers);
  }

  static validateBonusNumber(bonusNumber, winningNumbers) {
    this.checkPositiveInteger(bonusNumber);
    if (!isNumbersInRange(bonusNumber)) {
      throwError(ERROR_MESSAGES.INVALID_NUMBER_RANGE);
    }
    if (winningNumbers.includes(bonusNumber)) {
      throwError(ERROR_MESSAGES.CONFLICTING_BONUS_NUMBER);
    }
  }

  static checkDuplicates(numbers) {
    if (numbers.length !== new Set(numbers).size) {
      throwError(ERROR_MESSAGES.DUPLICATE_LOTTO_NUMBER);
    }
  }

  static checkPositiveInteger(number) {
    if (number === null) {
      throwError(ERROR_MESSAGES.EMPTY_INPUT_FIELD);
    }
    if (!isValidatePositiveInteger(number)) {
      throwError(ERROR_MESSAGES.INVALID_POSITIVE_INTEGER);
    }
  }

  static checkLottoArray(array) {
    if (
      array.length !== LOTTO_NUMBERS_LENGTH ||
      array.some((num) => num === null)
    ) {
      throwError(ERROR_MESSAGES.INVALID_LOTTO_NUMBERS_COUNT);
    }
    this.checkArrayElements(array);
  }
  static checkArrayElements(array) {
    if (array.some((num) => !isValidatePositiveInteger(num))) {
      throwError(ERROR_MESSAGES.INVALID_LOTTO_NUMBER);
    }
    if (array.some((num) => !isWinningNumbersFormat(num))) {
      throwError(ERROR_MESSAGES.INVALID_WINNING_NUMBERS_DELIMITER);
    }
    if (array.some((num) => !isNumbersInRange(num))) {
      throwError(ERROR_MESSAGES.OUT_OF_BOUNDS_NUMBER_RANGE);
    }
  }
}
export default InputValidator;
