import React from 'react';

export default function EmptyMessage(props) {
	const plus = <strong>+</strong>;

	return (
		<div className="decks-empty-message">
			<div className="message-start">
				Decks you create are listed here.
			</div>
			It looks like you haven't made any yet! To get started, click the {plus} icon above.
		</div>
	);
}
