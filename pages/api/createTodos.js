import {table, minifyRecords} from './utils/Airtable'

export default async (req, res) => {
    const {description} = req.body;

    try {
    const createdrecords = await table.create([{ fields : {description}}]);
    const createdrecord = {
        id : createdrecords[0].id,
        fields : createdrecords[0].fields
    }
    res.status(200).json({
       
        createdrecord
     })
} catch (err) {
    res.status(500).json({
       
        msg : 'Something went wrong'
     })
}
}



    
  