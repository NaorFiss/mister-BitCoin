import { NavLink, withRouter } from 'react-router-dom'
import React from 'react'


export function MoveList({moves}) {

   
    return (
        <section className="contact-moveList flex ">
            <h1 className="movelist-title">Your Moves:</h1>
            <ul className='contact-moves'>
                 {moves.map((move) =>(
                    <li key={move.at}>
                       <h3>At:  {move.toId}</h3>
                       <h3>Amount: {move.amount} coins</h3>
                       </li>
                 ))
            }
            </ul>
        </section>
    )
}
// export const MoveList = withRouter(_MoveList)

