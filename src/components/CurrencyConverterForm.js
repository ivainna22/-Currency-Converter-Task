import React from 'react';
import './style.css'

class CurrencyConverterForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hryvniaValue: '',
      dollarValue: '',
      exchangeRate: 1
    }
  }

  handlerChange = ({ target: { name, value } }) => {
    if (name === 'hryvniaValue') {
      this.setState({
        dollarValue: (value / this.state.exchangeRate).toFixed(2),
        hryvniaValue: value
      });
    } else {
      this.setState({
        hryvniaValue: (value * this.state.exchangeRate).toFixed(2),
        dollarValue: value
      })
    }
  }


  componentDidMount() {
    const url = "https://api.privatbank.ua/p24api/pubinfo?exchange&json&coursid=11";
    fetch(url)
      .then(res => res.json())
      .then((result) => {
        this.setState({
          exchangeRate: Number(result[0].buy)
        })
      });
  }


  render() {
    
    return (
      <form className='converter-form'>
        <h2 className='text'>Currency Converter</h2>
        <section className='row'>
          <input
            type="number"
            name='hryvniaValue'
            value={this.state.hryvniaValue}
            onChange={this.handlerChange} />

          <div className='currency-name'>₴, грн</div>
        </section>

        <div className='text'> = </div>

        <section className='row'>
          <input
            type="number"
            name='dollarValue'
            value={this.state.dollarValue}
            onChange={this.handlerChange} />

          <div className='currency-name'>$, дол</div>
        </section>

      </form>
    )

  }
}

export default CurrencyConverterForm