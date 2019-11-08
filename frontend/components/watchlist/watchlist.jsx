import React from 'react';
import { Link } from 'react-router-dom';

class Watchlist extends React.Component {

    constructor(props){
        super(props)
        this.state = {
        }
    }

    componentDidMount(){
        this.props.fetchWatchlistItems()
    }

    render(){
        const tickers = this.props.watchlistItems.map((ticker, idx) => {
                return (
                    <li key={`${ticker}-${idx}`} className="each-ticker watchlist-ticker">
                        <Link to={`/${ticker.symbol}`} id={ticker.id}>
                            {ticker.symbol.toUpperCase()}
                        </Link>
                    </li>
                )
            })
        
        return(

            <ul className="ticker-index block-paddings watchlist-box">
                <h1 className="watchlist">Watchlist</h1>
                <div className="watchlists">
                {tickers}
                </div>
            </ul>

        )

    }
}

export default Watchlist