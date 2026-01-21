// Index files serve as entry points for importing and exporting functions and classes only. They should not contain any application logic or implementation details.

import blog from './blog';

function index() {
  blog();
}

export default index;
