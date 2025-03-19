import { Header } from "../../componentes/Header"
import { Summary } from "../../componentes/Summary"
import { SearchForm } from "./components/SearchForm"
import { 
  TransactionsContainer, 
  TransactionsTable,
  PriceHighlight
} from "./styles"

export function Transactions() {
  return (
    <div>
      <Header />
      <Summary />
      <TransactionsContainer>
        <SearchForm />
        <TransactionsTable>
          <tbody>
            <tr>
              <td width="40%">Desenvolvimento de site</td>
              <td>
                <PriceHighlight variant="income">
                 R$ 500,000
                </PriceHighlight>
              </td>
              <td>Venda</td>
              <td>13/04/2024</td>
            </tr>

            <tr>
              <td width="40%">Hamburger</td>
              <td>
                <PriceHighlight variant="outcome">
                  - R$ 500,000
                </PriceHighlight>
              </td>
              <td>Venda</td>
              <td>13/04/2024</td>
            </tr>
          </tbody>
        </TransactionsTable>
      </TransactionsContainer>
    </div>
  )
}