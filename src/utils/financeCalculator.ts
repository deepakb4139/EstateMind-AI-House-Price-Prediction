import type { FinanceDetails } from '../types/property';

export function calculateFinanceDetails(
  marketValue: number,
  downPaymentPercent: number = 20,
  interestRatePercent: number = 8.5,
  loanTenureYears: number = 20,
  stampDutyPercent: number = 6.0
): FinanceDetails {
  if (!marketValue || marketValue <= 0) {
    return {
      downPaymentPercent: 20,
      downPaymentAmount: 0,
      interestRatePercent: 8.5,
      loanTenureYears: 20,
      loanAmount: 0,
      monthlyEmi: 0,
      totalInterestPayable: 0,
      stampDutyPercent: 6.0,
      stampDutyAmount: 0,
      registrationCharges: 0,
      totalPurchaseCost: 0,
    };
  }

  const downPaymentAmount = Math.round(marketValue * (downPaymentPercent / 100));
  const loanAmount = marketValue - downPaymentAmount;

  const monthlyRate = interestRatePercent / 12 / 100;
  const totalMonths = loanTenureYears * 12;

  let monthlyEmi = 0;
  let totalInterestPayable = 0;

  if (loanAmount > 0 && monthlyRate > 0 && totalMonths > 0) {
    const emiFactor = Math.pow(1 + monthlyRate, totalMonths);
    monthlyEmi = Math.round(
      loanAmount * monthlyRate * (emiFactor / (emiFactor - 1))
    );
    totalInterestPayable = Math.round((monthlyEmi * totalMonths) - loanAmount);
  }

  const stampDutyAmount = Math.round(marketValue * (stampDutyPercent / 100));
  const registrationCharges = Math.round(marketValue * 0.01);
  const totalPurchaseCost = marketValue + stampDutyAmount + registrationCharges;

  return {
    downPaymentPercent,
    downPaymentAmount,
    interestRatePercent,
    loanTenureYears,
    loanAmount,
    monthlyEmi,
    totalInterestPayable,
    stampDutyPercent,
    stampDutyAmount,
    registrationCharges,
    totalPurchaseCost,
  };
}
