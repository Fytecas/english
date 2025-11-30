<script lang="ts">
    import { ZoomInIcon } from "@lucide/svelte";

    let {point, onselect, show, orientation} = $props();

    let containerClass = $state();
    let tipClass = $state();
    switch (orientation) {
      case "top":
        containerClass = "container top";
        tipClass = "top_tip";
        break;
      case "right":
        containerClass = "container right";
        tipClass = "right_tip";
        break;
      case "left":
        containerClass = "container left";
        tipClass = "left_tip";
        break;
      default:
        containerClass = "container";
        tipClass = "";
    }
</script>

<div id={`badge-${point.id}`}>
    {#if show}
    <div class={containerClass}>
    <span class={tipClass}></span>

    <span class="title"><span class="number">{point.id}. </span>{point.title}</span>
    <button class="select-button" onclick={() => {
      onselect(point);
    }}><ZoomInIcon size={16}/>Go !</button>
    </div>
    {/if}
</div>

<style>
    .top_tip {
        display:block;
        width:1px;
        border-left: 10px solid transparent;
        border-right: 10px solid transparent;
        border-bottom: 8px solid #f5f5f5;
        position: absolute;
        top: -8px;
        left: 50%;
        transform: translateX(-50%);
    }

    .right_tip {
        display:block;
        height:1px;
        width: 1px;
        border-top: 10px solid transparent;
        border-bottom: 10px solid transparent;
        border-left: 8px solid #f5f5f5;
        position: absolute;
        right: -8px;
        top: 50%;
        transform: translateY(-50%);
    }

    .left_tip {
        display:block;
        height:1px;
        width: 1px;
        border-top: 10px solid transparent;
        border-bottom: 10px solid transparent;
        border-right: 8px solid #f5f5f5;
        position: absolute;
        left: -8px;
        top: 50%;
        transform: translateY(-50%);
    }

    .title {
        font-size: 24px;
        font-weight: bold;
        color: #333;
        max-width: 200px;
    }

    .container {
        display: flex;
        gap: 5px;
        flex-direction: column;
        align-items: left;
        justify-content: left;
        padding: 10px;
        border-radius: 10px;
        background-color: #f5f5f5;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .container.right {
        transform: translateX(-65%);
    }

    .container.top {
        transform: translateY(50%);
    }

    .container.left {
        transform: translateX(50%);
    }

    .select-button {
        padding: 6px 10px;
        border-radius: 5px;
        background-color: #007bff;
        color: #fff;
        border: none;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 16px;
        gap: 5px;

        transition: background-color 0.3s ease;
    }

    .select-button:hover {
        background-color: #0056b3;
    }

    .number {
        font-size: 18px;
        font-weight: bold;
        color: #333;
        margin-right: 5px;
    }

</style>
