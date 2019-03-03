import React from 'react'
import { Progress } from "semantic-ui-react";

export default ({ prcentUploaded, state }) => (state > 0 && (
    <Progress percent={prcentUploaded} progress indicating size="medium" className="progress-bar" inverted />
))