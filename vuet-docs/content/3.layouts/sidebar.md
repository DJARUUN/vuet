# Sidebar

This is a simple layout component that creates a two-part grid layout with a sidebar on the left and the page content on the right. It also has a mobile version with the sidebar header as the topnav and the sidebar content behind a hamburger menu.

It pairs perfectly with the [Sidebar](/components/sidebar) component.

## Usage

It has two slots, `sidebar` and the default unnamed slot. By itself it only acts as a layout container and therefore has to have the full sidebar passed in to the `sidebar` slot.

For full flexibility I opted for not including the [Sidebar](/components/sidebar) component in the layout but instead having a slot for it to be able to use your own custom sidebar and have the ability to customize the sidebar component fully without doing it through the layout.
