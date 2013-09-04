// Copyright 2002-2013, University of Colorado Boulder

/**
 * Copyright 2002-2013, University of Colorado
 * buttons and model control elements
 * Author: Vasily Shakhov (Mlearner)
 */

define( function( require ) {
  'use strict';
  var Node = require( 'SCENERY/nodes/Node' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var HBox = require( 'SCENERY/nodes/HBox' );
  var VBox = require( 'SCENERY/nodes/VBox' );
  var Text = require( 'SCENERY/nodes/Text' );
  var Image = require( 'SCENERY/nodes/Image' );
  var inherit = require( 'PHET_CORE/inherit' );
  var ResetAllButton = require( 'BALLOONS_AND_STATIC_ELECTRICITY/view/ResetAllButton' );
  var RectangleButton = require( 'SUN/RectangleButton' );
  var InOutRadioButton = require( 'SUN/InOutRadioButton' );
  var Panel = require( 'SUN/Panel' );
  var VerticalAquaRadioButtonGroup = require( 'SUN/VerticalAquaRadioButtonGroup' );
  var MultiLineText = require( 'SCENERY_PHET/MultiLineText' );
  var Property = require( 'AXON/Property' );
  var ToggleNode = require( 'SUN/ToggleNode' );
  var balloonsAndStaticElectricityImages = require( 'BALLOONS_AND_STATIC_ELECTRICITY/balloons-and-static-electricity-images' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );

  function ControlPanel( strings, model, layoutBounds ) {

    // super constructor
    Node.call( this, {renderer: 'svg'} );

    // Add/Remove wall button.
    var addRemoveFont = new PhetFont( 18 );
    var addWallText = new MultiLineText( strings["BalloonApplet.addWall"], {font: addRemoveFont} );
    var removeWallText = new MultiLineText( strings["BalloonApplet.removeWall"], {font: addRemoveFont, center: addWallText.center} );
    var toggleNode = new ToggleNode( removeWallText, addWallText, model.wall.isVisibleProperty );
    var wallButton = new Panel( toggleNode, {fill: '#eec227', cursor: 'pointer'} );
    wallButton.addInputListener( {down: function() {model.wall.isVisible = !model.wall.isVisible;}} );

    //show charges radioGroup
    var radioButtonFont = new PhetFont( 15 );
    var showChargesRadioButtonGroup = new VerticalAquaRadioButtonGroup( [
      { node: new Text( strings["BalloonApplet.ShowAllCharges"], {font: radioButtonFont} ), property: model.showChargesProperty, value: 'all' },
      { node: new Text( strings["BalloonApplet.ShowNoCharges"], {font: radioButtonFont} ), property: model.showChargesProperty, value: 'none' },
      { node: new Text( strings["BalloonApplet.ShowChargeDifferences"], {font: radioButtonFont} ), property: model.showChargesProperty, value: 'diff' }
    ] );

    var scale = 0.14;
    var yellowBalloonImage = new Image( balloonsAndStaticElectricityImages.getImage( 'balloon-yellow.png' ) );
    var twoBalloonIcon = new Node( {children: [
      new Image( balloonsAndStaticElectricityImages.getImage( 'balloon-green.png' ), {x: 160} ),
      yellowBalloonImage
    ], scale: scale} );

    var oneBalloonIcon = new Node( {children: [
      new Image( balloonsAndStaticElectricityImages.getImage( 'balloon-yellow.png' ), {x: twoBalloonIcon.width / scale / 2 - yellowBalloonImage.width / 2 } ),
      new Rectangle( 0, 0, twoBalloonIcon.width / scale, twoBalloonIcon.height / scale, {fill: 'black', visible: false} )
    ], scale: scale} );

    var showBalloonsChoice = new HBox( {children: [
      new InOutRadioButton( model.balloons[1].isVisibleProperty, false, oneBalloonIcon ),
      new InOutRadioButton( model.balloons[1].isVisibleProperty, true, twoBalloonIcon )]} );

    var resetBalloonText = new Text( strings["BalloonApplet.resetBalloons" ], {font: new PhetFont( 15 )} );

    var balloonsPanel = new VBox( {spacing: 2, children: [showBalloonsChoice, new RectangleButton( resetBalloonText, function() {
      model.sweater.reset();
      model.balloons.forEach( function( entry ) {
        entry.reset( true );
      } );
    } )]} );

    //Link plural vs singular afterwards so the button layout will accommodate both
    model.balloons[1].isVisibleProperty.link( function( both ) {resetBalloonText.text = strings[both ? "BalloonApplet.resetBalloons" : "BalloonApplet.resetBalloon"];} );

    //Add the controls at the right, with the reset all button and the wall button
    //The reset all button is scaled to match the size in Beer's Law Lab (which is also scaled because of the ScreenView.layoutBounds)
    //TODO: remove the reset all button scale factor after the ResetAllButton is specifying the correct size itself, after Phase I deploys
    var controls = new HBox( {spacing: 16, align: 'bottom', children: [new ResetAllButton( model.reset.bind( model ), {scale: 88 / 121} ), wallButton]} );

    controls.right = layoutBounds.maxX - 2;
    controls.bottom = layoutBounds.maxY - 4;

    this.addChild( new HBox( {spacing: 35, children: [new Panel( showChargesRadioButtonGroup ), balloonsPanel], align: 'bottom', left: 70, bottom: layoutBounds.maxY - 4} ) );
    this.addChild( controls );
  }

  inherit( Node, ControlPanel );

  return ControlPanel;
} );