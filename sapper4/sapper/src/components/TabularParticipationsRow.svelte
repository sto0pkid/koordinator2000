<script>
  import ToolTipsy from 'cmps/ToolTipsy.svelte';
  import {get_status_class,get_tickmark,short_description,long_description} from 'srcs/stuff.js';
  import {my_user} from 'srcs/my_user.js';


  export let participation;
  export let idx;
</script>

<tr>
  <td class={get_status_class(participation)}>{idx + 1}</td>

  <td><a href="/users/{participation.account.id}">{participation.account.name}</a></td>

  <td>
    <ToolTipsy>{participation.threshold}
      <div slot="tooltip" class="info_tooltip">
        The number of other users that must start participating, before this user starts.
        {participation.threshold} other users must start first.
      </div>
    </ToolTipsy>
  </td>

  <td>
    <ToolTipsy enabled="{!$my_user.hide_help}">
    {get_tickmark(participation)} - {short_description(participation)}
    <div slot="tooltip">
      <div class="help_tooltip">
        {long_description(participation)}
      </div>
    </div>
    </ToolTipsy>
  </td>
</tr>
