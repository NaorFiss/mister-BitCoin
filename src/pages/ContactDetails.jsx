import { Component } from 'react'
import { TransferFund } from '../cmps/TransferFund.jsx'
import { MoveList } from '../cmps/MoveList.jsx'
import { contactService } from '../services/contact.service.js'
import { userService } from '../services/user.service.js'

export class ContactDetails extends Component {

    state = {
        contact: null,
        user: null
    }

    componentDidMount() {
        this.loadContact()
        this.loadUser()
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.match.params.id !== this.props.match.params.id) {
            this.loadContact()

        }
    }

    loadContact = async () => {
        const contact = await contactService.getContactById(this.props.match.params.id)
        this.setState({ contact })
    }

    loadUser = async () => {
        const user = await userService.getUser()
        this.setState({ user })
    }

    onBack = () => {
        this.props.history.push('/contact')
    }

    get movesToContact() {
        let moves = userService.getUserMoves().filter(
            (move) => move.toId === this.state.contact._id
        )
        return moves
    }

    render() {
        const { contact, user } = this.state
        console.log("contact", contact)
        console.log("user", user)

        if (!contact || !user) return <div>Loading...</div>
        return (
            <section className='contact-details flex space-between'>
                <section className="details-container">
                    <h1>Name: {contact.name}</h1>
                    <h4>eMail: {contact.email}</h4>
                    <h4>Phone: {contact.phone}</h4>
                    <img src={`https://robohash.org/set_set4/${contact._id}`} alt="" />
                </section>
                <section>
                <TransferFund contact={contact} maxCoins={user.coins} />
                {/* {!!this.movesToContact.length  && (
                        <MovesList
                            moves={this.movesToContact}
                        />
                    )} */}
                </section>
            </section>

        )
    }
}
