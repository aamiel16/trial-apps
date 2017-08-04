import PouchDb from 'pouchdb';

const localDb = new PouchDb('http://localhost:5984/account_500');
let global_doc_type;

export function getDocs(doc_type) {
  global_doc_type = doc_type
  return function(dispatch) {
    localDb.query('temp_design/by_document', {
      key: `${doc_type}`,
      include_docs: true
    }).then((res)=>{
      console.log('Query Success: ', res);
      dispatch({type: 'SET_DATA_SUCCESS', payload: res.rows});
    }).catch((err)=>{
      console.log('Query Error: ', err);
      dispatch({type: 'SET_DATA_ERROR'});
    })
    dispatch({type: 'SET_DATA_IN_PROGRESS'});
  }
}

export function deleteDoc(id) {
  return function(dispatch) {
    localDb.get(id)
      .then((doc)=>{
        doc._deleted = true;
        return localDb.put(doc);
    }).then((res)=>{
      console.log('Delete Document Success: ', res);
      dispatch(getDocs(global_doc_type));
    }).catch((err)=>{
      console.log('Delete Document Error: ', err);
    })
  }
}
