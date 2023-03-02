const { default: axios } = require('axios')
const express = require('express')
const moment = require('moment/moment')
const mongoose = require('mongoose')

const app = express()
app.use(express.json())


const Product = require('./Model/product')
app.get('/', (req, res) => {
    res.send('hello')
})

// initialize the data

app.get('/products', async (req, res) => {
    try {

        const response = await axios.get('https://s3.amazonaws.com/roxiler.com/product_transaction.json');
        const data = response.data;


        await mongoose.connect(`mongodb+srv://janhavi:12345@cluster0.esiytt3.mongodb.net/roxiler?retryWrites=true&w=majority`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        const result = await Product.insertMany(data);
        console.log(`${result.length} documents were inserted into the collection.`);
        res.send(`${result.length} documents were inserted into the collection.`);
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: 'Server Error' });
    }
})

app.get('/statistics/:month', async (req, res) => {
    try {
        const { month } = req.params;
        const sales = await Sale.find({ dateOfSale: { $regex: `${month}`, $options: 'i' } });
        const soldItems = sales.filter(sale => sale.isSold === true);
        const notSoldItems = sales.filter(sale => sale.isSold === false);

        const totalSaleAmount = sales.reduce((acc, sale) => acc + sale.price, 0);
        const totalSoldItems = soldItems.length;
        const totalNotSoldItems = notSoldItems.length;

        res.status(200).json({
            totalSaleAmount,
            totalSoldItems,
            totalNotSoldItems
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})

// Endpoint for barchart

app.get('/barchart/:month', async (req, res) => {
    try {
        const month = parseInt(req.params.month);
        const pipeline = [
            {
                $match: {
                    $expr: {
                        $eq: [{ $month: "$dateOfSale" }, month]
                    }
                }
            },
            {
                $bucket: {
                    groupBy: "$price",
                    boundaries: [0, 100, 200, 300, 400, 500, 600, 700, 800, 900, Infinity],
                    default: "Other",
                    output: {
                        count: { $sum: 1 }
                    }
                }
            }
        ];
        const result = await Product.aggregate(pipeline);
        res.send(result);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});

const apiUrl = 'https://s3.amazonaws.com/roxiler.com/product_transaction.json'

let productsData = [];

axios.get(apiUrl)
    .then(response => {
        productsData = response.data;
    })
    .catch(error => {
        console.log(error);
    });

// Endpoint for pie chart
app.get('/piechart/:month', (req, res) => {
    const month = req.params.month;
    const filteredProducts = productsData.filter(product => {
        return product.dateOfSale.split('-')[1] === month;
    });

    const categories = {};
    filteredProducts.forEach(product => {
        const category = product.category;
        if (!categories[category]) {
            categories[category] = 0;
        }
        categories[category]++;
    });

    const categoriesList = Object.keys(categories);
    const categoriesData = categoriesList.map(category => {
        return { name: category, count: categories[category] };
    });

    res.send(categoriesData);
});

// mongoose.connect("",()=>{
app.listen(8080, () => {
    console.log("listening on port http://localhost:8080")
})
// })