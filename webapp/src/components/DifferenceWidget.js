import React from 'react';
import PropTypes from 'prop-types';

const DifferenceWidget = ({
  timezoneA,
  timezoneB,
}) => {
  if (!timezoneA || !timezoneB) {
    return (
      <div className="difference-widget">
        <p style={{ textAlign: 'center' }}>
          Loading locations...
        </p>
      </div>
    );
  }

  const { timezone_offset: offset1 } = timezoneA;
  const { timezone_offset: offset2 } = timezoneB;

  let offsetDifference = offset1 - offset2;
  if (offset1 < offset2) {
    offsetDifference = offset2 - offset1;
  }

  return (
    <div className="difference-widget">
      <p>Time Difference</p>
      <h1>{`${offsetDifference / 60 / 60} hours`}</h1>
    </div>
  );
};

DifferenceWidget.propTypes = {
  timezoneA: PropTypes.object.isRequired,
  timezoneB: PropTypes.object.isRequired,
};

export default DifferenceWidget;
