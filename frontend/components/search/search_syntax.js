import React from 'react';

const SearchSyntaxTable = () => {
  return (
    <table className="s-table s-table__bx-simple mb24 js-advanced-tips">
      <thead>
        <tr>
          <th className="s-table--cell2" scope="col">Search type</th>
          <th scope="col">Search syntax</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">Tags</th>
          <td className="ff-mono">[tag]</td>
        </tr>
        <tr>
          <th scope="row">Exact</th>
          <td className="ff-mono">"words here"</td>
        </tr>
        <tr>
          <th scope="row">Author</th>
          <td className="ff-mono">
            user:1234<br />
            user:me <span className="fc-light">(yours)</span>
          </td>
        </tr>
        <tr>
          <th scope="row">Score</th>
          <td className="ff-mono">
            score:3 <span className="fc-light">(3+)</span><br />
            score:0 <span className="fc-light">(none)</span>
          </td>
        </tr>
        <tr>
          <th scope="row">Answers</th>
          <td className="ff-mono">
            answers:3 <span className="fc-light">(3+)</span><br />
            answers:0 <span className="fc-light">(none)</span><br />
            isaccepted:yes<br />
            hasaccepted:no<br />
            inquestion:1234
                  </td>
        </tr>
        <tr>
          <th scope="row">Views</th>
          <td className="ff-mono">views:250</td>
        </tr>
        <tr>
          <th scope="row">Sections</th>
          <td className="ff-mono">
            title:apples<br />
            body:"apples oranges"
                </td>
        </tr>
        <tr>
          <th scope="row">URL</th>
          <td className="ff-mono">url:"*.example.com"</td>
        </tr>
        <tr>
          <th scope="row">Favorites</th>
          <td className="ff-mono">
            infavorites:mine<br />
            infavorites:1234
                </td>
        </tr>
        <tr>
          <th scope="row">Status</th>
          <td className="ff-mono">
            closed:yes<br />
            duplicate:no<br />
            migrated:no<br />
            wiki:no
                </td>
        </tr>
        <tr>
          <th scope="row">Types</th>
          <td className="ff-mono">
            is:question<br />
            is:answer
                </td>
        </tr>
        <tr>
          <th scope="row">Exclude</th>
          <td className="ff-mono">
            -[tag]<br />
            -apples
                </td>
        </tr>
        <tr>
        </tr>
      </tbody>
    </table>
  );
};

export default SearchSyntaxTable;