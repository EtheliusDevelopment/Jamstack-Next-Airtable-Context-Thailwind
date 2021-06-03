  
import Head from 'next/head';
import Navbar from '../components/Navbar';
import { table, minifyRecords } from './api/utils/airtable';
// import Todo from '../compenents/Todo';
// import { useEffect, useContext } from 'react';
// import { TodosContext } from '../contexts/TodosContext';
// import TodoForm from '../compenents/TodoForm';
// import auth0 from './api/utils/auth0';

export default function Home({ initialTodos }) {
    console.log(initialTodos);
    return (
        <div>
            <Head>
                <title>My Todo CRUD App</title>
            </Head>
            <Navbar />

              <main>
                  <h1> JamStack Power </h1>
              </main>
    </div>
      );
  }

  export async function getServerSideProps(context) {

    try {
          const todos = await table.select({}).firstPage();
          return {
          props : {
          initialTodos : minifyRecords(todos)
          }
    }     
  } catch (err) {
    console.error(err);
    return {
      props : {
        msg : "Something Went Wrong"
      }
    }
  }
}