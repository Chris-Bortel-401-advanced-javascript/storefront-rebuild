import React from 'react';
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';

import {When} from 'react-if';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';

import {addToCart} from '../../store/cart.js';
import {decrementStock} from '../../store/products.js';

import './product.scss';

const useStyles = makeStyles({
  root: {
    maxWidth: 320,
    height: 330,
    position: 'relative',
  },
  media: {
    height: 140,
  },
  typography: {
    paddingLeft: 1,
  },
  button: {
    // Style buttons
  },
  card: {
    height: 140,
  }
});


function Products() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const products = useSelector(state => state.products.products)
  const activeCategory = useSelector(state => state.categories.activeCategory)

  let filtered = products.filter(product => product.category === activeCategory.name )
  const add = (product) => {
    dispatch(addToCart(product));
    dispatch(decrementStock(product));
  }

  return (
  <>

    <Container maxWidth="md" component="main">
    <Grid container spacing={5} alignItems="stretch">

      {filtered.map(product => {
        return (

          <Grid item xs={12} sm={6} md={4} key={product._id}>
            <Card className={classes.root}>
            <CardActionArea>
              <CardMedia
                className={classes.media}
                image={product.imageUrl}
                title="Contemplative Reptile"
              />
              <CardContent>
                <Typography className={classes.typography} gutterBottom variant="h5" component="h2">
                  {product.name} 
                </Typography>
                <Typography className={classes.typography} variant="body2" color="textSecondary" component="p">
                  $ {product.price}
                </Typography>
              </CardContent>
            </CardActionArea>

            <CardActions>
              <div className='card-buttons'>
                <When condition={product.inStock > 0}>
                  <Button className={classes.button} onClick={() => add(product)} size="small" color="primary">
                    Add To Cart
                  </Button>
                </When>
                <Button className={classes.button} size="small" color="primary" component={Link} to={`/product/${product._id}`} >
                    View Details
                </Button>
              </div>
            </CardActions>
            </Card>
          </Grid>
        );
      })}
      
    </Grid>
    </Container>

  </>
  )
}

export default Products;