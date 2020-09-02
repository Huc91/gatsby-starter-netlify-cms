import React from 'react'

import Layout from '../../components/Layout'
import BookRoll from '../../components/BookRoll'

export default class BookIndexPage extends React.Component {
  render() {
    return (
      <Layout>
        <div>
        <span>BOOOKZ</span>
        <section className="section">
        <div className="container">
          <div className="content">
            <BookRoll />
          </div>
        </div>
        </section>
        </div>
      </Layout>
    )
  }
}
