import { css } from "@emotion/css";

Element.prototype.appendTo = function( parent )
{
	parent.append( this );

	return this;
};
Element.prototype.addId    = function( id )
{
	this.id = id;

	return this;
};
Element.prototype.addStyles = function( styles )
{
	typeof styles === "object" ? this.classList.add( ...styles ) : this.classList.add( styles );

	return this;
};
const _content              = document.querySelector( "#content" ),
	mainColor = css( { color: "hsla(15, 100%, 60%, 0.7)" } ),
	bodyStyle = css( {
		backgroundColor: "#222",
		height         : "100vh",
		width          : "100vw",
	} ),
	_body = document.querySelector( "body" )
		.addStyles( [bodyStyle, mainColor, "tk-rubik"] ),
	main = document.querySelector( "main" );

initializeDropdown( main );
function addButtonLogic( dropdown )
{
	const open = css( { visibility: "initial" } ),
		closed = css( { visibility: "hidden" } ),
		dropdownContent = dropdown.querySelector( "#dropdownContent" );

	dropdownContent.classList.add( closed, open );
	dropdown.querySelector( "#dropdownButton" )
		.addEventListener( "click", () =>
		{ dropdownContent.classList.toggle( closed ) } );
	dropdown
		.addEventListener( "mouseleave", () =>
		{
			if ( !dropdownContent.classList.contains( closed ) )
			{ dropdownContent.classList.toggle( closed ) }
		} );
}
function initializeDropdownButton( dropdown )
{
	const dropdownButtonStyle = css( {
			backgroundColor: "hsla(15, 100%, 60%, 0.5)",
			border         : "none",
			color          : "white",
			fontSize       : "1.5rem",
			padding        : "0.5rem",
			width          : "100%",
			cursor         : "pointer",
			"&:hover"      : { boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)" },
			"&:focus"      : { outline: "none" },
		} ),
		dropdownButton = document.createElement( "button" );

	dropdownButton
		.addStyles( dropdownButtonStyle )
		.addId( "dropdownButton" )
		.appendTo( dropdown )
		.textContent = "Dropdown";
}
function initializeDropdownContent( centerFlex, mainBackgroundColor, dropdown )
{
	const dropdownContentStyle = css( {
			position       : "absolute",
			backgroundColor: "#111",
			width          : "100%",
			top            : "100%",
			overflow       : "auto",
			boxShadow      : "0 0 10px rgba(0, 0, 0, 0.5)",
			"&>li"         : {
				listStyleType: "none",
				padding      : "0.5rem",
				color        : "white",
				fontSize     : "1.5rem",
				"&:hover"    : {
					boxShadow      : "0px 0px 10px rgba(0, 0, 0, 0.5)",
					backgroundColor: mainBackgroundColor,
				 },
			},
		}, centerFlex ),
		dropdownContent = document.createElement( "ul" )
			.addStyles( dropdownContentStyle )
			.addId( "dropdownContent" )
			.appendTo( dropdown ),
		itemsNames = [ "Item 1", "Item 2", "Item 3" ];

	initializeDropdownItems( dropdownContent, itemsNames );
	addButtonLogic( dropdown );

}
function initializeDropdownItems( dropdownContent, itemsNames )
{
	for ( const name of itemsNames )
	{
		const item = document.createElement( "li" )
			.appendTo( dropdownContent );

		item.textContent = name;
	}
}
export default function initializeDropdown( parent )
{
	const mainBackgroundColor = "hsla(15, 100%, 60%, 0.7)",
		centerFlex = css( {
			display       : "flex",
			flexDirection : "column",
			justifyContent: "center",
			alignItems    : "center",
		} ),
		dropdownStyle = css( {
			position: "relative",
			width   : "fit-content",
		}, centerFlex ),
		dropdown = document.createElement( "div" )
			.addStyles( dropdownStyle )
			.addId( "dropdown" );

	initializeDropdownButton( dropdown );
	initializeDropdownContent( centerFlex, mainBackgroundColor, dropdown );
	parent.append( dropdown );
}
