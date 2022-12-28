import React, { Component } from 'react'
import { userService } from '../services/user.service.js'

export class TransferFund extends Component {

    state = {
        amount: '',
        contact: '',
        maxCoins: ''
    }


    componentDidMount() {
        const { contact, maxCoins } = this.props
        console.log("this.props", this.props)
        this.setState({ contact: contact, maxCoins: maxCoins })
    }

    handleChange = ({ target }) => {
        let amount = target.value
        this.setState({ amount: amount })
    }

    onTransferCoins = (ev) => {
        ev.preventDefault()
        if (this.state.amount < this.state.maxCoins) {
            userService.addMove(this.state.contact, this.state.amount)
            this.setState(prevState => ({ maxCoins: prevState.maxCoins - this.state.amount }))
        }
    }

    render() {
        const { maxCoins, contact } = this.state
        return (
           
            <form className='transferFund' onSubmit={this.onTransferCoins}>
                 <p className="transfer-title"> Transfer coins to: {contact.name}</p>
                <label htmlFor="amount"></label>
                <input className="transfer-form" ref={this.handleRef} onChange={this.handleChange}  value={this.state.amount} type="number" name="amount" placeholder="amount" id="amount" />
                <button>Transfer</button>
                <p className="transfer-balance"> BTC Balance: {maxCoins}</p>
            </form>

        )
    }
}
