// Copyright 2002-2013, University of Colorado

/**
 * Scenery display object (scene graph node) for the Balloon of the model.
 *
 *
 @author Vasily Shakhov (Mlearner)
 */

define( function ( require ) {
  'use strict';
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Image = require( 'SCENERY/nodes/Image' );
  var Path = require( 'SCENERY/nodes/Path' );
  var KiteShape = require( 'KITE/Shape' );

  var SimpleDragHandler = require( 'SCENERY/input/SimpleDragHandler' );
  var PlusCharge = require( 'view/PlusCharge' );
  var MinusCharge = require( 'view/MinusCharge' );
  var Vector2 = require( 'DOT/Vector2' );

  function BalloonNode( x, y, model, imgsrc, globalModel ) {
    var self = this;

    // super constructor
    Node.call( this, { cursor: 'pointer' } );

    this.x = x;
    this.y = y;

    var startChargesNode = new Node();
    var addedChargesNode = new Node();

    //When dragging, move the balloon
    this.addInputListener( new SimpleDragHandler( {
                                                    //When dragging across it in a mobile device, pick it up
                                                    allowTouchSnag: true,
                                                    start: function () {
                                                      model.isDragged = true;
                                                    },
                                                    end: function () {
                                                      model.isDragged = false;
                                                      model.velocity = new Vector2( 0, 0 );
                                                    },
                                                    //Translate on drag events
                                                    translate: function ( args ) {
                                                      model.location = globalModel.getBalloonRestrictions( args.position, model.width, model.height );
                                                    }
                                                  } ) );

    // add the Balloon image
    this.addChild( new Image( imgsrc, {
    } ) );

    //rope
    var customShape = new KiteShape();
    customShape.moveTo( model.width / 2, model.height - 2 );
    customShape.lineTo( 500 - model.location.x, globalModel.height - model.location.y );
    var path = new Path( {
                           shape: customShape,
                           stroke: '#000000',
                           lineWidth: 1
                         } );

    this.addChild( path );


    // static charges
    for ( var i = 0; i < model.plusCharges.length; i++ ) {
      model.plusCharges[i].view = new PlusCharge( model.plusCharges[i].location );
      startChargesNode.addChild( model.plusCharges[i].view );

      model.minusCharges[i].view = new MinusCharge( model.minusCharges[i].location );
      startChargesNode.addChild( model.minusCharges[i].view );
    }


    //posssible charges
    for ( i = model.plusCharges.length; i < model.minusCharges.length; i++ ) {
      model.minusCharges[i].view = new MinusCharge( model.minusCharges[i].location );
      model.minusCharges[i].view.visible = false;
      addedChargesNode.addChild( model.minusCharges[i].view );
    }

    this.addChild( startChargesNode );
    this.addChild( addedChargesNode );


    //link model below
    model.link( 'charge', function updateLocation( chargeVal ) {
      if ( chargeVal ) {
        model.minusCharges[model.plusCharges.length - 1 - chargeVal - 1].view.visible = true;
      }
    } );

    model.link( 'location', function updateLocation( location ) {
      self.translation = location;
    } );

    model.link( 'isVisible', function updateVisibility( booleanValue ) {
      self.visible = booleanValue;
    } );

    globalModel.link( 'showCharges', function updateChargesVisibilityOnBalloon( value ) {
      if ( value === 'diff' ) {
        startChargesNode.visible = false;
        addedChargesNode.visible = true;
      }
      else {
        var visiblity = (value === 'all');
        startChargesNode.visible = visiblity;
        addedChargesNode.visible = visiblity;
      }
    } );

    model.view = this;
  }

  inherit( BalloonNode, Node ); // prototype chaining

  return BalloonNode;
} );