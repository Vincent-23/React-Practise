import React,{ useState ,useContext } from 'react'
import { MyContext } from '../Context';
import { 
  TITLE,CALCULATOR_VALUE,CALCULATOR_LOAN_AMOUNT,
  CALCULATOR_MONTHLY_INTEREST_RATE,CALCULATOR_TENURE,
  CLEAR_TEXT, SUBMIT_TEXT, WARNING_TEXT
} from '../const';
import './Styles/EmiCalculator.scss'

const EmiCalculator = () => {
  let baseCls = "emi-calculator"
  const {emi, setEmi, errorText, setErrorText} = useContext(MyContext);
  const [loanAmount, setLoanAmount] = useState(0);
  const [monthlyInterestRate, setMonthlyInterestRate] = useState(0);
  const [tenure, setTenure] = useState(0);

  const handleEmiCalculate = () => {
    // EMI FORMULA
    // emi = P * r * (1 + r)^n / ((1 + r)^n - 1)

    const Principal = parseFloat(loanAmount);
    const MonthlyInterestRate = parseFloat(monthlyInterestRate) / (12 * 100);
    const Month = parseFloat(tenure) * 12;
    const Emi = Principal * MonthlyInterestRate * Math.pow(1 + MonthlyInterestRate, Month) / (Math.pow(1 + MonthlyInterestRate, Month) - 1);
    // const total = parseFloat(emi).toFixed(2) === "NaN" ? 0 : parseFloat(emi).toFixed(2);
    setEmi(Emi);
}

const handleEmiClear = () => {
    setLoanAmount("");
    setMonthlyInterestRate("");
    setTenure("");
    setEmi(0)
}

const handleLoanAmountChange = (e) => {
    let value = e?.target?.value;
    if(value < -1) {
        setErrorText(WARNING_TEXT);
    }{
        setLoanAmount(value)
    }
}

  return (
    <div className={`${baseCls}__container`}>
      <h4 className={`${baseCls}__error_text`}>{errorText}</h4>
      <div className={`${baseCls}__body-container`}>
        <div className={`${baseCls}__body-item`}>
            <h2 className={`${baseCls}__title`}>{TITLE}</h2>
            <div className={`${baseCls}__item`}>
                <h1 className={`${baseCls}__title`}>{`${CALCULATOR_VALUE}${' '}${emi.toFixed(2)}`}</h1>
            </div>

            <div className={`${baseCls}__item`}>
                <label>{CALCULATOR_LOAN_AMOUNT}{' '}</label><br/>
                <input className={`${baseCls}_input-field`} value ={loanAmount} id='loanAmt' onChange={handleLoanAmountChange}/>
            </div>

            <div className={`${baseCls}__item`}>
                <label>{CALCULATOR_MONTHLY_INTEREST_RATE}{' '}</label><br/>
                <input className={`${baseCls}_input-field`} value={monthlyInterestRate} onChange={(e) => setMonthlyInterestRate(e.target.value)}/>
            </div>

            <div className={`${baseCls}__item`}>
                <label>{CALCULATOR_TENURE}{' '}</label><br/>
                <input className={`${baseCls}_input-field`} value={tenure} onChange={(e) => setTenure(e.target.value)}/>
            </div>

            <div className={`${baseCls}__btn-container`}>
                <div className={`${baseCls}__submit-btn`}>
                    <button onClick={() => handleEmiClear()}>{CLEAR_TEXT}</button>
                </div>
                <div className={`${baseCls}__clear-btn`}>
                    <button onClick={() => handleEmiCalculate()}>{SUBMIT_TEXT}</button>
                </div>
            </div>
        </div>
        <div className={`${baseCls}__body-item`}>
          <div className={`${baseCls}__value-item`}>
            <h5 className={`${baseCls}__label-item`}>Principal Amount</h5>
            <h6 className={`${baseCls}__label-value`}>{loanAmount}</h6>
          </div>
          <div className={`${baseCls}__value-item`}>
            <h5 className={`${baseCls}__label-item`}>Interest Amount</h5>
            <h6 className={`${baseCls}__label-value`}>{monthlyInterestRate/12/100}</h6>
          </div>
          <div className={`${baseCls}__value-item`}>
            <h5 className={`${baseCls}__label-item`}>Total Amount Payable</h5>
            <h6 className={`${baseCls}__label-value`}>{emi*120}</h6>
          </div>

        </div>
      </div>
  </div>
  )
}

export default EmiCalculator