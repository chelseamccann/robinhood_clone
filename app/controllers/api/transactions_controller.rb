class Api::TransactionsController < ApplicationController

    def create
        @transaction = Transaction.new(transaction_params)
        @transaction.user_id = current_user.id

        ticker = Ticker.find_by(symbol: params[:transaction][:ticker_symbol])
        @transaction.ticker_id = ticker.id
        
        @bp = current_user.buying_power 
        cost = @transaction.purchase_price * @transaction.purchase_shares

        if @transaction.buy === true && @bp >= cost && @transaction.save!
            current_user.update_attribute(:buying_power, @bp - cost)
            render "api/transactions/show" 
        elsif @transaction.buy === false # and if you have that number of shares
            current_user.update_attribute(:buying_power, @bp + cost)
            render "api/transactions/show" 
        elsif @bp < cost
            render json:["Not enough buying power."]
        # elsif not enough shares - - need total shares currently held

        end
    end

    def index
        if current_user
            @transactions = Transaction.all
            render json: @transactions
        else
            render json: @transactions.errors.full_messages
        end
    end

    def show
        @transaction = Transaction.find(params[:ticker_id])
        render json: @transaction
    end

    private
    def transaction_params
        params.require(:transaction).permit(:ticker_symbol, :purchase_price, :purchase_shares, :buy)
    end

end