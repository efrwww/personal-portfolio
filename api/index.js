import Cors from 'cors'

// Initialize CORS
const cors = Cors({
  origin: '*',
  methods: ['POST', 'OPTIONS']
})

// Helper to run CORS middleware
function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) return reject(result)
      return resolve(result)
    })
  })
}

export default async function handler(req, res) {
  // Run CORS
  await runMiddleware(req, res, cors)

  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { name, contact, message, division, concern } = req.body

    // Validate required fields
    if (!name || !contact || !message) {
      return res.status(400).json({ error: '请填写必填信息' })
    }

    // Use MongoDB Atlas Data API
    const ATLAS_API_URL = process.env.ATLAS_API_URL
    const ATLAS_API_KEY = process.env.ATLAS_API_KEY

    if (!ATLAS_API_URL || !ATLAS_API_KEY) {
      // 如果没有配置 Data API，保存到日志
      console.log('Contact form submission:', { name, contact, message, division, concern })
      return res.status(200).json({
        success: true,
        message: '提交成功！（演示模式）'
      })
    }

    const response = await fetch(`${ATLAS_API_URL}/insertOne`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': ATLAS_API_KEY
      },
      body: JSON.stringify({
        collection: 'contact_submissions',
        database: 'portfolio',
        dataSource: 'Cluster0',
        document: {
          name,
          contact,
          message,
          division: division || '',
          concern: concern || '',
          submittedAt: new Date().toISOString()
        }
      })
    })

    const result = await response.json()

    if (result.error) {
      throw new Error(result.error.message || '数据库错误')
    }

    return res.status(200).json({
      success: true,
      message: '提交成功！',
      id: result.insertedId
    })

  } catch (error) {
    console.error('Error:', error.message)
    return res.status(500).json({
      error: '服务器错误，请稍后重试',
      details: error.message
    })
  }
}
