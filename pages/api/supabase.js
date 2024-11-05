// pages/api/supabase.js
import { supabase } from '../../supabase/supabaseClient'

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { data, error } = await supabase.from('todos').select('*')
    if (error) return res.status(500).json({ error: error.message })
    res.status(200).json(data)
  } else {
    res.setHeader('Allow', ['GET'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
