module.exports = (res, error) => {
    res.staus(500).json({
        success: false,
        message: error.message ? error.message : error
    })
}