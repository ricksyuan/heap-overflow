import React from 'react';

const SearchSyntaxTable = () => {
  return (
    <table class="s-table s-table__bx-simple mb24 js-advanced-tips">
      <thead>
        <tr>
          <th class="s-table--cell2" scope="col">Search type</th>
          <th scope="col">Search syntax</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">Tags</th>
          <td class="ff-mono">[tag]</td>
        </tr>
        <tr>
          <th scope="row">Exact</th>
          <td class="ff-mono">"words here"</td>
        </tr>
        <tr>
          <th scope="row">Author</th>
          <td class="ff-mono">
            user:1234<br />
            user:me <span class="fc-light">(yours)</span>
          </td>
        </tr>
        <tr>
          <th scope="row">Score</th>
          <td class="ff-mono">
            score:3 <span class="fc-light">(3+)</span><br />
            score:0 <span class="fc-light">(none)</span>
          </td>
        </tr>
        <tr>
          <th scope="row">Answers</th>
          <td class="ff-mono">
            answers:3 <span class="fc-light">(3+)</span><br />
            answers:0 <span class="fc-light">(none)</span><br />
            isaccepted:yes<br />
            hasaccepted:no<br />
            inquestion:1234
                  </td>
        </tr>
        <tr>
          <th scope="row">Views</th>
          <td class="ff-mono">views:250</td>
        </tr>
        <tr>
          <th scope="row">Sections</th>
          <td class="ff-mono">
            title:apples<br />
            body:"apples oranges"
                </td>
        </tr>
        <tr>
          <th scope="row">URL</th>
          <td class="ff-mono">url:"*.example.com"</td>
        </tr>
        <tr>
          <th scope="row">Favorites</th>
          <td class="ff-mono">
            infavorites:mine<br />
            infavorites:1234
                </td>
        </tr>
        <tr>
          <th scope="row">Status</th>
          <td class="ff-mono">
            closed:yes<br />
            duplicate:no<br />
            migrated:no<br />
            wiki:no
                </td>
        </tr>
        <tr>
          <th scope="row">Types</th>
          <td class="ff-mono">
            is:question<br />
            is:answer
                </td>
        </tr>
        <tr>
          <th scope="row">Exclude</th>
          <td class="ff-mono">
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